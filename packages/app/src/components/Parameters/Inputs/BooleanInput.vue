<script setup lang="ts">
const checkedModel = defineModel<boolean>()

</script>

<template>
  <div style="display: flex; gap: 30px">
    <input type="checkbox" v-model="checkedModel"/>
  </div>
</template>