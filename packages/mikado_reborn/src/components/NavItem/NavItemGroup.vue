<template>
  <ul
    class="mkr__nav-item-group"
    :class="[
      `mkr__nav-item-group--${type}`,
      {
        'mkr__nav-item-group--top-nav': topNav,
        'mkr__nav-item-group--horizontal': horizontal,
      },
    ]"
  >
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

withDefaults(
  defineProps<{
    type?: 'main' | 'sub' | 'sub-light',
    topNav?: boolean,
    horizontal?: boolean
  }>(),
  {
    type: 'main',
    topNav: false,
    horizontal: false,
  }
);

</script>

<style src="./NavItemGroup.scss" lang="scss"></style>
