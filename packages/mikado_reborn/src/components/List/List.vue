<template>
  <ul
    class="mkr__list"
    :class="[
      `mkr__list--${size}`,
      { 'mkr__list--item-hoverable': itemHoverable },
    ]"
  >
    <slot />
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export const ListSize = {
  medium: 'medium',
  large: 'large',
};

@Component
export default class List extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  itemHoverable?: boolean

  @Prop({
    type: String,
    default: ListSize.medium,
    validator: (variant) => Object.values(ListSize).includes(variant),
  })
  size!: keyof typeof ListSize
}

</script>

<style src="./List.scss" lang="scss"></style>
