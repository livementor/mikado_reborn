<template>
  <MkrButton
    v-bind="$attrs"
    :variant="'outlined'"
  >
    <slot></slot>
  </MkrButton>
</template>

<script lang="ts" setup >
import MkrButton from '../Button.vue';
import './OutlinedButton.scss';

</script>
