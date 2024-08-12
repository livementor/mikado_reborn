<template>
  <li
    class="mkr__list__item"
    :class="{ 'mkr__list__item--clickable': clickable }"
    tabindex="-1"
    v-on="{
      ...$listeners,
      click: (event) => clickable ? $emit('click', event) : undefined
    }"
  >
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    clickable: {
      type: Boolean,
      default: false,
    },
  },
});

</script>

<style src="./ListItem.scss" lang="scss"></style>
