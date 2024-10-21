<script setup lang="ts">
import { MkrSwitch } from '@livementor/mikado_reborn/src/components'
import { ref } from 'vue'

const value = defineModel()
const emit = defineEmits(['update']);

const toggle = (isChecked) => {
  value.value = isChecked;
  emit('update', isChecked)
}

</script>

<template>
  <div style="display: flex; gap: 30px">
    <input type="checkbox" :checked="value" @change="toggle($event.target.checked)"/>
  </div>
</template>