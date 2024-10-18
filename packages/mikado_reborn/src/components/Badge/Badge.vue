<template>
  <span :class="`mkr__badge mkr__badge--${type}`">
    <slot />
  </span>
</template>

<script lang="ts" setup>
export type badgeType =
  'danger' |
  'danger-light' |
  'info' |
  'info-light' |
  'primary' |
  'primary-light' |
  'secondary' |
  'success' |
  'success-light' |
  'warning-light' |
  'other-1';

withDefaults(
  defineProps<{type: badgeType}>(),
  { type: 'primary' },
);

</script>

<style src="./Badge.scss" lang="scss"></style>
