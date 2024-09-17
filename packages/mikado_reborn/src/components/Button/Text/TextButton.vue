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

import { withDefaults, defineProps } from 'vue';

type textButtonThemes = 'neutral' | 'neutral-80' | 'neutral-60' | 'secondary-dark' | 'danger';

withDefaults(
  defineProps<{ theme: textButtonThemes }>(),
  { theme: 'neutral' },
);

</script>
