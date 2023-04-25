<script setup lang="ts">
import { ref } from 'vue'
import AppScreen from "@/components/AppScreen.vue"
import AppButtons from "@/components/AppButtons.vue"

const result = ref<string>()

const updateScreen = (_in: string) => {
  if (result.value) result.value += _in
  else result.value = _in 
}
</script>
<template>
  <div class="h-screen w-screen grid place-items-center bg-white">
    <div>
      <app-screen :result="result"></app-screen>
      <app-buttons @basic-ops="(n: string) => updateScreen(n)"></app-buttons>
    </div>
  </div>
</template>
