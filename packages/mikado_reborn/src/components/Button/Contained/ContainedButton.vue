<template>
  <MkrButton
    :variant="'contained'"
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
import './ContainedButton.scss';

type containedButtonThemes = {
  primary: 'primary',
  'primary-light': 'primary-light',
  secondary: 'secondary',
  'secondary-light': 'secondary-light',
  'danger-light': 'danger-light',
  neutral: 'neutral',
};

const props = withDefaults(
  defineProps<{ type: PropType<keyof typeof containedButtonThemes> }>(),
  { type: 'primary' }
);

</script>
