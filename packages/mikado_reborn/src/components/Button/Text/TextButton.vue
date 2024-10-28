<template>
  <MkrButton
    :variant="'text'"
    :theme="theme"
  >
    <slot />
  </MkrButton>
</template>

<script lang="ts" setup>
import './TextButton.scss';
import MkrButton from '../Button.vue';

type textButtonThemes = 'neutral' | 'neutral-80' | 'neutral-60' | 'secondary-dark' | 'danger';

withDefaults(
  defineProps<{ theme?: textButtonThemes }>(),
  { theme: 'neutral' },
);

</script>
