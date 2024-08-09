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

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import MkrButton from '../../../mixins/Button/Button.vue';
import './ContainedButton.scss';

export const containedButtonThemes = {
  primary: 'primary',
  'primary-light': 'primary-light',
  secondary: 'secondary',
  'secondary-light': 'secondary-light',
  'danger-light': 'danger-light',
  neutral: 'neutral',
};

export default defineComponent({
  components: { MkrButton },
  props: {
    theme: {
      default: 'primary',
      validator: (theme: string) => Object.keys(containedButtonThemes).includes(theme),
      type: String as PropType<keyof typeof containedButtonThemes>,
    },
  },
});
</script>
