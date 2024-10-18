<script setup lang="ts">

const value = defineModel();
const emit = defineEmits(['update']);

const toggle = (isChecked) => {
  value.value = isChecked;
  emit('update', isChecked)
}

</script>

<template>
  <input type="checkbox" :checked="value" @change="toggle((<HTMLInputElement> $event.target).checked)"/>
</template>