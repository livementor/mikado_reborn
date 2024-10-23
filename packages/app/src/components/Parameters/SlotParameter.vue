<script setup lang="ts">
const model = defineModel<string>()
defineProps<{ name?: string }>()

</script>

<template>
  <tr>
    <th>{{ name || 'Slot' }}</th>
    <td>
      <input
        type="text"
        v-model="model"
        placeholder="..."
      >
    </td>
  </tr>
</template>

<style scoped lang="scss">

</style>