<script setup lang="ts">
import { reactive } from 'vue'

const buttons = reactive(['Rad', 'Deg', 'x!', '(', ')',
                          '%', 'AC', 'Inv', 'sin', 'ln',
                          '7', '8', '9', '÷', 'π', 
                          'cos', 'log', '4', '5', '6', 
                          '×', 'e', 'tan', '√', '1', 
                          '2', '3', '-', 'Ans', 'EXP',
                          'x<sup>y</sup>', '0', '.', '=', '+'])

const basic = reactive(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'])
</script>
<template>
  <div class="h-screen w-screen grid place-items-center bg-white">
    <div>
      <div class="h-16 border border-gray-400 my-3 rounded-lg"></div>
      <div class="grid grid-cols-7 grid-rows-5 gap-[6px]">
        <div class="col-span-2 flex justify-between items-center bg-complex rounded">
          <div class="calculator-button rounded-l">{{ buttons[0] }}</div>
          <div class="bg-gray-400 h-4/6 w-[1px]"></div>
          <div class="calculator-button rounded-r">{{ buttons[1] }}</div>
        </div>
        <div
          v-for="(button, i) in buttons.slice(2)"
          :key="i"
          class="calculator-button rounded"
          :class="
            basic.includes(button)
              ? 'bg-basic'
              : button == '='
              ? 'bg-highlight text-white'
              : 'bg-complex'
          "
        >
          <span v-html="button"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
