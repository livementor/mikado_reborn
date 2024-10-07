<template>
  <ul
    class="mkr__list"
    :class="[
      `mkr__list--${size}`,
      { 'mkr__list--padded': padded },
      { 'mkr__list--item-hoverable': itemHoverable },
    ]"
  >
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue';

withDefaults(
  defineProps<{
    itemHoverable?: boolean,
    padded?: boolean,
    size?: 'small' | 'medium' | 'large'
  }>(),
  {
    itemHoverable: false,
    padded: false,
    size: 'medium',
  },
);

</script>

<style src="./List.scss" lang="scss"></style>
