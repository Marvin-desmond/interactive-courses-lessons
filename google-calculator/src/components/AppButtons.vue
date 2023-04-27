<script setup lang="ts">
import { useSymbols } from '@/symbols'
import AppButton from '@/components/AppButton.vue'

const buttons = useSymbols()
const emit = defineEmits(['basicOps', 'evalOps', 'clearOps'])

const buttonAction = (symbol: string) => {
  const basicMatch = /[+\-/()÷%×πe\d]/g
  if (basicMatch.test(symbol)) {
    emit('basicOps', symbol)
  } else if (['tan', 'cos', 'log', 'sin', 'ln', '√'].includes(symbol)) {
    emit('basicOps', symbol + '(')
  } else if (symbol == '='){
      emit('evalOps')
  } else if (symbol == "AC"){
    emit("clearOps")
  }
}

</script>
<template>
  <div class="grid grid-cols-7 grid-rows-5 gap-[6px]">
    <div class="col-span-2 flex justify-between items-center bg-complex rounded">
      <app-button :symbol="buttons[0]"></app-button>
      <div class="bg-gray-400 h-4/6 w-[1px]"></div>
      <app-button :symbol="buttons[1]"></app-button>
    </div>
    <div v-for="(button, i) in buttons.slice(2)" :key="i">
      <app-button :symbol="button" @click="buttonAction(button)"></app-button>
    </div>
  </div>
</template>
