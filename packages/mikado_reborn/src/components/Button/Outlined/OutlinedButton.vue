<template>
  <MkrButton
    :variant="'outlined'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </MkrButton>
</template>

<script lang="ts" setup >
import MkrButton from '../Button.vue';
import './OutlinedButton.scss';

</script>
