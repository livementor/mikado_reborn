<template>
  <MkrButton
    :variant="'outlined'"
    v-bind="$attrs"
  >
    <slot></slot>
  </MkrButton>
</template>

<script lang="ts" setup >
import MkrButton from '../Button.vue';
import './OutlinedButton.scss';

</script>
