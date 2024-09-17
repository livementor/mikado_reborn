<template>
  <component
    :is="component"
    :class="classes"
    v-bind="$attrs"
    @click="emit('click', $event)"
  >
    <MkrIcon :name="name" />
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, withDefaults, defineProps, defineEmits } from 'vue';
import { MkrIcon } from '../Icon';

const props = withDefaults(
  defineProps<{
    name: string,
    theme?: 'light' | 'dark' | string, // string for customColor ?
    activated?: boolean,
  }>(),
  { theme: 'light', activated: false },
);

// classes
const classBase = 'mkr__interactive-icon';
const classes = computed(() => [
  classBase,
  `${classBase}--${props.theme}`,
  { [`${classBase}--${props.theme}--activated`]: props.activated },
]);

const component = computed((context) => {
  const isRouterLink = !!context.$attrs.to;
  const isLink = !!context.$attrs.href;

  return isRouterLink ? 'RouterLink' :
    isLink ? 'a' :
      'button';
});

const emit = defineEmits(['click']);

</script>

<style src="./InteractiveIcon.scss" lang="scss"></style>
