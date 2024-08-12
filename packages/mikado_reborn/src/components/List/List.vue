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

<script lang="ts">
import { defineComponent } from 'vue';

export const ListSize = {
  medium: 'medium',
  large: 'large',
};

export default defineComponent({
  props: {
    itemHoverable: {
      type: Boolean,
      default: false,
    },
    padded: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: ListSize.medium,
      validator: (variant: string) => Object.values(ListSize).includes(variant),
    },
  },
});

</script>

<style src="./List.scss" lang="scss"></style>
