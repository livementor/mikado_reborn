<script setup lang="ts">
const checkedModel = defineModel()

</script>

<template>
  <div style="display: flex; gap: 30px">
    <input type="checkbox" v-model="checkedModel"/>
  </div>
</template>