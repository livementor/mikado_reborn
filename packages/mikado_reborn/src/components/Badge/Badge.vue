<template>
  <span :class="`mkr__badge mkr__badge--${type}`"><slot /></span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

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

@Component
export default class Badge extends Vue {
  @Prop({ default: 'primary', validator: (type: string) => badgeType.includes(type) })
  type!: string;
}
</script>

<style src="./Badge.scss" lang="scss"></style>
