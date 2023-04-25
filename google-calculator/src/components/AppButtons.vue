<script setup lang="ts">
import { reactive } from 'vue'
import AppButton from '@/components/AppButton.vue'

const emit = defineEmits(['basicOps'])

const buttons = reactive([
    'Rad', 'Deg', 'x!', '(', ')',
    '%', 'AC', 'Inv', 'sin', 'ln',
    '7', '8', '9', '÷', 'π', 
    'cos', 'log', '4', '5', '6', 
    '×', 'e', 'tan', '√', '1', 
    '2', '3', '-', 'Ans', 'EXP',
    'x<sup>y</sup>', '0', '.', '=', '+'])

const buttonAction = (symbol: string) => {
  const basicMatch = /[+\-/()÷%×\d]/g
  if (basicMatch.test(symbol)) {
    emit('basicOps', symbol)
  } else if (['tan', 'cos', 'log', 'sin', 'ln'].includes(symbol)) {
    emit('basicOps', symbol + '(')
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
