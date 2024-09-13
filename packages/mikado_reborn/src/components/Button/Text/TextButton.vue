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
import MkrButton from '../../../mixins/Button/Button.vue';
import './TextButton.scss';

type textButtonThemes = 'neutral' | 'neutral-80' | 'neutral-60' | 'secondary-dark' | 'danger';

const props = withDefaults(
  defineProps<{ type: textButtonThemes }>(),
  { type: 'neutral' }
);

</script>
