<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
  immediate: boolean
  result?: string
}>()

const init = ref(false)
const immediate_state_before = ref(false)
const answer_ops = ref<string>()

const active_ops = computed(() => {
  if (props.immediate || immediate_state_before.value){
    answer_ops.value = active_ops.value
  } 
  
  immediate_state_before.value = props.immediate
  return props.result
})

watch(active_ops, ()=>{
  if (props.result) init.value = true  
})

</script>
<template>
    <div 
      class="h-20 w-[600px] border border-gray-400 
      my-3 rounded-lg relative overflow-hidden">
        <span 
        class="icon-[material-symbols--device-reset-rounded]
        absolute top-2 left-2 text-2xl text-gray-500 cursor-pointer">
        </span>
        <div class="absolute top-2 right-2 text-sm tracking-tighter
        text-gray-400 origin-top-right" 
        v-show="init"
        :class="{ 'answer-scale-down': immediate || immediate_state_before }">
          <span v-if="immediate" v-html="answer_ops"></span>
          <span v-else>Ans</span>
          <span class="mx-1">=</span>
          <span v-if="!immediate" v-html="answer_ops ?? '0'"></span>
        </div>
        <div class="absolute bottom-2 right-2 text-4xl tracking-tighter"
        :class="{ 'screen-from-down': immediate || immediate_state_before }"
        v-html="result ?? '0'">
        </div>
      </div>
</template>

<style scoped>
@keyframes answer-scale-down {
  0%    { transform: scale(1.8); }
  100%  { transform: scale(1); }
}

@keyframes screen-from-down {
  0%    { bottom: -100px; }
  100%  { bottom: 8px; }
}
.answer-scale-down {
  animation: answer-scale-down 0.3s forwards;
}

.screen-from-down {
  animation: screen-from-down 0.25s forwards;
}
</style>