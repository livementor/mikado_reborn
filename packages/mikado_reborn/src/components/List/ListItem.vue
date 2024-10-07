<template>
  <li
    class="mkr__list__item"
    :class="{ 'mkr__list__item--clickable': clickable }"
    tabindex="-1"
    v-on="{
      click: (event) => clickable ? $emit('click', event) : undefined
    }"
  >
    <slot />
  </li>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue';

withDefaults(defineProps<{ clickable?: boolean }>(), { clickable: false });

</script>

<style src="./ListItem.scss" lang="scss"></style>
