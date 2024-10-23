<template>
  <component
    v-bind="$attrs"
    :is="component"
    :class="classes"
    @click="$emit('click', $event)"
  >
    <MkrIcon :name="name"/>
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import {
  computed, useAttrs,
} from 'vue';
import { MkrIcon } from '../Icon';

const props = withDefaults(
  defineProps<{
    name: string,
    theme?: 'light' | 'dark' | string, // string for customColor ?
    activated?: boolean,
  }>(),
  { theme: 'light', activated: false },
);

defineEmits(['click']);

const $attrs = useAttrs();

// classes
const classBase = 'mkr__interactive-icon';
const classes = computed(() => [
  classBase,
  `${classBase}--${props.theme}`,
  { [`${classBase}--${props.theme}--activated`]: props.activated },
]);

const component = computed(() => {
  const isRouterLink = !!$attrs.to;
  const isLink = !!$attrs.href;

  // eslint-disable-next-line no-nested-ternary
  return isRouterLink ? 'RouterLink'
    : isLink ? 'a'
      : 'button';
});

</script>

<style src="./InteractiveIcon.scss" lang="scss"></style>
