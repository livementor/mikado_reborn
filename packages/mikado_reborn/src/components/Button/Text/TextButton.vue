<template>
  <MkrButton
    :variant="'text'"
    :theme="theme"
    v-bind="$attrs"
  >
    <slot></slot>
  </MkrButton>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';
import './TextButton.scss';
import MkrButton from '../Button.vue';

type textButtonThemes = 'neutral' | 'neutral-80' | 'neutral-60' | 'secondary-dark' | 'danger';

withDefaults(
  defineProps<{ theme?: textButtonThemes }>(),
  { theme: 'neutral' },
);

</script>
