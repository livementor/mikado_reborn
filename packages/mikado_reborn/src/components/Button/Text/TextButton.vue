<template>
  <MkrButton
    :variant="'text'"
    :theme="theme"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </MkrButton>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import MkrButton from '../../../mixins/Button/Button.vue';
import './TextButton.scss';

type textButtonThemes = {
  neutral: 'neutral',
  'neutral-80': 'neutral-80',
  'neutral-60': 'neutral-60',
  'secondary-dark': 'secondary-dark',
  danger: 'danger',
};

const props = withDefaults(
  defineProps<{type: PropType<keyof typeof textButtonThemes>}>(),
  { type: 'neutral' }
);

</script>
