<template>
  <div class="mkr__app" ref="appRef">
    <div ref="tooltipContainer" id="tooltip-container" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue';

const appRef = ref(null);
provide('appRef', appRef);

</script>

<style src="./App.scss" lang="scss"></style>
