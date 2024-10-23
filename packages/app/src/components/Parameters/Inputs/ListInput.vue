<script setup lang="ts">
const selectedModel = defineModel<never>();
defineProps<{ list: Array<{ value?: string, label?: string, variants?: string[] }> }>();

</script>

<template>
  <select v-model="selectedModel">
    <option value="">
      --
    </option>
    <option
      v-for="(option, index) in list"
      :key="index"
      :value="option.value"
      :disabled="option.variants && option.variants.length>0"
    >
      {{ option.variants ? '▼ ' + option.variants.join(', ') : (option.label || option.value) }}
    </option>
  </select>
</template>

<style scoped lang="scss">

</style>