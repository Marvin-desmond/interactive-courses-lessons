<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  result?: string
}>()

const active_ops = computed(() => props.result)
const answer_ops = ref<string>()

</script>
<template>
    <div 
      class="h-20 w-[600px] border border-gray-400 
      my-3 rounded-lg relative">
        <span 
        class="icon-[material-symbols--device-reset-rounded]
        absolute top-2 left-2 text-2xl text-gray-500 cursor-pointer">
        </span>
        <div class="absolute top-2 right-2 text-sm tracking-tighter"> 

        </div>
        <div class="absolute bottom-2 right-2 text-4xl tracking-tighter">
          {{ active_ops ?? '0' }}
        </div>
      </div>
</template>