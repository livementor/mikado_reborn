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
import { withDefaults, defineProps } from 'vue';
import MkrButton from '../Button.vue';
import './ContainedButton.scss';

type containedButtonThemes = 'primary' | 'primary-light' | 'secondary' | 'secondary-light' | 'danger-light' | 'neutral';

withDefaults(
  defineProps<{ theme?: containedButtonThemes }>(),
  { theme: 'primary' },
);

</script>
