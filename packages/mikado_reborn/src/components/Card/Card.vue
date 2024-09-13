<template>
  <div
    class="mkr__card"
    :class="[`mkr__card--radius-${radius}`, { 'mkr__card--elevated': elevated, 'mkr__card--border': bordered }]">
    <slot/>
  </div>
</template>

<script lang="ts" setup>

export type radiusType = 'small' | 'medium' | 'large';

const props = withDefaults(
  defineProps<{
    elevated: boolean,
    bordered: boolean,
    radius: radiusType
  }>(),
  { elevated: false, bordered: false, radius: 'small' }
);

/*import { CreateElement, RenderContext, VNode } from 'vue';
import { mergeData } from 'vue-functional-data-merge';

export const radius = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

export default {
  /!*functional: true,*!/
  props: {
    elevated: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: String,
      default: 'small',
      validator: (value: string): boolean => Object.values(radius).includes(value),
    },
  },
};*/
</script>

<style src="./Card.scss" lang="scss"></style>
