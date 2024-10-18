<script setup lang="ts">
const selected = defineModel();
defineProps<{ list: Array<string | object> }>();
defineEmits(['update'])

</script>

<template>
    <select v-model="selected" @change="$emit('update', (<HTMLSelectElement> $event.target)?.value)">
    <option value="">--</option>
    <option v-for="(option, index) in list" :key="index" :value="option" :disabled="option.isGroupName">{{ option.isGroupName ? '▼ ' + option.mkr.join(', ') : option }}</option>
  </select>

</template>

<style scoped lang="scss">

</style>