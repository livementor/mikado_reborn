<template>
  <MkrButton
    v-bind="$attrs"
    :variant="'contained'"
    :theme="theme"
  >
    <slot></slot>
  </MkrButton>
</template>

<script lang="ts" setup>
import MkrButton from '../Button.vue';
import './ContainedButton.scss';

type containedButtonThemes = 'primary' | 'primary-light' | 'secondary' | 'secondary-light' | 'danger-light' | 'neutral';

withDefaults(
  defineProps<{ theme?: containedButtonThemes }>(),
  { theme: 'primary' },
);

</script>
