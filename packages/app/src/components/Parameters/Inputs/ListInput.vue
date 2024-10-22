<script setup lang="ts">
const selectedModel = defineModel();
defineProps<{ list: Array<string | object> }>();

</script>

<template>
    <select v-model="selectedModel">
    <option value="">--</option>
    <option v-for="(option, index) in list" :key="index" :value="option" :disabled="option.isGroupName">{{ option.isGroupName ? '▼ ' + option.mkr.join(', ') : option }}</option>
  </select>

</template>

<style scoped lang="scss">

</style>