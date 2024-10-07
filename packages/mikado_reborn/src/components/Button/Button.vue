<template>
  <component
    :is="componentType"
    :class="buttonClasses"
    v-bind="attributes"
    :disabled="disabled"
    @click="handleClick"
  >
    <MkrIcon v-if="icon && iconSide === 'left'" :name="icon" :class="`${baseClass}__icon--left`" />
    <slot></slot>
    <MkrIcon v-if="icon && iconSide === 'right'" :name="icon" :class="`${baseClass}__icon--right`" />
  </component>
</template>

<script lang="ts" setup>
import {
  computed, useAttrs, useSlots, withDefaults,
} from 'vue';
import { MkrIcon } from '../Icon';
import './Button.scss';

const props = withDefaults(
  defineProps<{
    disabled?: boolean,
    size?: 'small' | 'medium' | 'large',
    icon?: string,
    iconSide?: 'left' | 'right',
    variant?: 'contained' | 'outlined' | 'text',
    theme?: string,
    activated?: boolean,
  }>(),
  {
    disabled: false,
    size: 'medium',
    iconSide: 'left',
    variant: 'contained',
    theme: '',
    activated: false,
  },
);

const emit = defineEmits(['click']);

const baseClass = 'mkr__button';

const hasContent = computed(() => useSlots().default && useSlots().default().length > 0);
const componentClass = computed(() => `${baseClass}--${props.variant}`);
const themeClass = computed(() => (props.theme ? `${componentClass.value}--${props.theme}` : ''));

const buttonClasses = computed(() => [
  baseClass,
  `${baseClass}--${props.size}`,
  !hasContent.value && `${baseClass}--icon-only`,
  componentClass.value,
  themeClass.value,
  props.activated && `${themeClass.value}--activated`,
].filter(Boolean).join(' '));

const isRouterLink = computed(() => 'to' in useAttrs());
const isLink = computed(() => 'href' in useAttrs());

const componentType = computed(() => {
  if (isRouterLink.value) return 'RouterLink';
  if (isLink.value) return 'a';
  return 'button';
});

const handleClick = (event) => emit('click', event);

const attributes = computed(() => ({
  ...useAttrs(),
  disabled: props.disabled,
}));

</script>
