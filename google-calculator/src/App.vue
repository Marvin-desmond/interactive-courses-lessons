<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppScreen from '@/components/AppScreen.vue'
import AppButtons from '@/components/AppButtons.vue'
import { useSymbols } from '@/symbols'

const buttons = useSymbols()
const result = ref<string>()
const immediate = ref(false)
const superscript = ref(false)

const getAllIndeces = (str: string, subStr: string) => {
  var indices = []
  var index = -1
  while ((index = str.indexOf(subStr, index + 1)) !== -1) {
    indices.push(index)
  }
  return indices
}

const addMultiplier = (inputCheck: string): string => {
  const escaped = buttons.map(
    (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    ).join('|')
  const allMatch = new RegExp(`(${escaped})`, 'g')
  const nonAdvancedMatch = /[+\-\./÷%×()\d]/g
  const fiveSymbolsMatch = /[+\-\./÷%×]/g

  const all = inputCheck.match(allMatch)
  const basics = inputCheck.match(nonAdvancedMatch)
  const subtraction = all?.filter((x) => !basics?.includes(x))
  // get all indeces
  // @ts-ignore
  let indeces = subtraction?.flatMap((e) => getAllIndeces(inputCheck, e))
  indeces = [...new Set(indeces)] // remove duplicates

  let offset = 0
  indeces?.forEach((start: number) => {
    start = start + offset
    let immediatelyBefore = inputCheck.slice(start - 1, start)
    // the first part of the conditional is to avoid changing
    // advanced operators that start in the result value
    if (immediatelyBefore !== '' && !fiveSymbolsMatch.test(immediatelyBefore)) {
      inputCheck = inputCheck.slice(0, start) + '×' + inputCheck.slice(start)
      offset += 1
    }
  })
  return inputCheck
}

const updateScreen = (_in: string) => {
  if (result.value) {
    if (immediate.value && !superscript.value) {
      if (/^\d+$/.test(_in)) {
        result.value = _in
      } else result.value += _in
    } else result.value += _in
  } else result.value = _in
  immediate.value = false
}

const calculateScreen = () => {
  if (result.value) {
    const chars: Record<string, string> = {
      '×': '*',
      '÷': '/',
      'sin': 'Math.sin',
      'cos': 'Math.cos',
      'tan': 'Math.tan',
      'ln': 'Math.log',
      'log': 'Math.log10',
      'π': 'Math.PI',
      'e': 'Math.exp(1)',
      '√': 'Math.sqrt'
    }
    const pattern = new RegExp(Object.keys(chars).join('|'), 'ig')
    let temp = addMultiplier(result.value)
    temp = correctSup(temp)
    temp = updatePower(temp)
    temp = temp.replace(pattern, (m: string) => chars[m])    
    result.value = `${Number(eval(temp).toFixed(3))}`
    immediate.value = true
    superscript.value = false
  }
}

const updateScreenSup = () => {
  if (result.value != undefined) {
    if (superscript.value) result.value += "</sup>"
    else result.value += "<sup>"
    superscript.value = !superscript.value
  }
}

function correctSup(str: string):
    string {
    if (str.slice(-1) == "(") str += "1)"
    if (str.slice(-5) == "<sup>") str += "1</sup>"
    const pattern = /\(|<sup>|\)|<\/sup>/g
    let matches = str.match(pattern)

    if (matches !== null) {
        if (matches.length % 2 === 0) return str
        let counts_sup = matches!.filter((x: string) => ["<sup>", "</sup>"].includes(x)).length
        if (counts_sup % 2 !== 0)
            return str += "</sup>"
        else 
            return str += ")"
    } else {
        return str
    }
}

const updatePower = (_in: string): string => {
    const powerMatch = /(\d+)<sup>(\d+)<\/sup>/g
    const replace = "$1**($2)"
    _in = _in.replace(powerMatch, replace)
    return _in
}

const clearScreen = () => {
  if (result.value) {
    if (immediate.value && /^-?\d+\.?\d*$/.test(result.value)) {
        result.value = undefined
        return  
    }

    let index;
    const escaped = buttons.map(
      (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      ).join('|')
    const allMatch = new RegExp(`(${escaped})`, 'g')
    const all = (result.value as string).match(allMatch)

    const lastSymbol = all?.slice(-1)[0]
    if (lastSymbol){
      index = result.value.lastIndexOf(lastSymbol)
      if (lastSymbol == "("){
        index = result.value.lastIndexOf(all?.slice(-2, -1)[0])
      }
      result.value = result.value.slice(0, index)
      if (result.value == "") result.value = undefined      
    }
  }
}

onMounted(() => {
  // clearScreen()
})
</script>
<template>
  <div class="h-screen w-screen grid place-items-center bg-white">
    <div>
      <app-screen 
      :immediate="immediate"
      :result="result"></app-screen>
      <app-buttons
        @basic-ops="(n: string) => updateScreen(n)"
        @eval-ops="calculateScreen"
        @clear-ops="clearScreen"
        @sup-ops="updateScreenSup"
      ></app-buttons>
    </div>
  </div>
</template>
