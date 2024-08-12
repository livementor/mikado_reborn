<template>
  <div class="mkr__app">
    <div ref="tooltipContainer" id="tooltip-container" />
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default {
  created(): void {
    Vue.prototype.$app = this;
  },
};
</script>

<style src="./App.scss" lang="scss"></style>
