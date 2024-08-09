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

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import MkrButton from '../../../mixins/Button/Button.vue';
import './TextButton.scss';

export const textButtonThemes = {
  neutral: 'neutral',
  'neutral-80': 'neutral-80',
  'neutral-60': 'neutral-60',
  'secondary-dark': 'secondary-dark',
  danger: 'danger',
};

export default defineComponent({
  components: { MkrButton },
  props: {
    theme: {
      default: 'neutral',
      validator: (theme: string) => Object.keys(textButtonThemes).includes(theme),
      type: String as PropType<keyof typeof textButtonThemes>,
    },
    activated: { default: false, type: Boolean },
  },
});
</script>
