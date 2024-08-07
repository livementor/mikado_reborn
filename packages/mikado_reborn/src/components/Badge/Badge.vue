<template>
  <span :class="`mkr__badge mkr__badge--${type}`"><slot /></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export const badgeType = [
  'danger',
  'danger-light',
  'info',
  'info-light',
  'primary',
  'primary-light',
  'secondary',
  'success',
  'success-light',
  'warning-light',
  'other-1',
];

export default defineComponent({
  props: {
    type: {
      default: 'primary',
      validator: (type: string) => badgeType.includes(type),
      type: String,
    },
  },
});

</script>

<style src="./Badge.scss" lang="scss"></style>
