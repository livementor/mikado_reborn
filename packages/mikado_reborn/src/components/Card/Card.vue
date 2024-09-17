<template>
  <div
    class="mkr__card"
    :class="[`mkr__card--radius-${radius}`, { 'mkr__card--elevated': elevated, 'mkr__card--border': bordered }]">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

export type radiusType = 'small' | 'medium' | 'large';

withDefaults(
  defineProps<{
    elevated: boolean,
    bordered: boolean,
    radius: radiusType
  }>(),
  { elevated: false, bordered: false, radius: 'small' },
);

</script>

<style src="./Card.scss" lang="scss"></style>
