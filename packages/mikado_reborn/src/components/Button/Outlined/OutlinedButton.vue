<template>
  <MkrButton
    :variant="'outlined'"
  >
    <slot />
  </MkrButton>
</template>

<script lang="ts" setup>
import MkrButton from '../Button.vue';
import './OutlinedButton.scss';

</script>
