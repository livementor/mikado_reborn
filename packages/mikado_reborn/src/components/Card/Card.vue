<template>
  <div v-bind="$attrs" class="mkr__card"
    :class="[`mkr__card--radius-${radius}`, { 'mkr__card--elevated': elevated, 'mkr__card--border': border }]">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue';

export type radiusType = 'small' | 'medium' | 'large';

withDefaults(
  defineProps<{
    elevated?: boolean,
    border?: boolean,
    radius?: radiusType
  }>(),
  { elevated: false, border: false, radius: 'small' },
);

</script>

<style src="./Card.scss" lang="scss"></style>
