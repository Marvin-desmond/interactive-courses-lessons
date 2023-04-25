<script setup lang="ts">
import { reactive } from 'vue'

defineProps<{
  symbol: string
}>()

const basic = reactive([
    '0', '1', '2', '3', '4', '5', 
    '6', '7', '8', '9', '.'])
</script>
<template>
  <div
    class="calculator-button rounded"
    :class="
      basic.includes(symbol) ? 
      'bg-basic' : symbol == '=' ? 
      'bg-highlight text-white' : 'bg-complex'
      ">
    <span v-html="symbol"></span>
  </div>
</template>
