<template>
  <ul class="mkr__nav-item-group">
    <slot />
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Nav extends Vue {}
</script>
<style src="./NavItemGroup.scss" lang="scss"></style>
