<template>
  <div class="mkr__list" :class="[listSizeClass, { '--item-hoverable': itemHoverable }]">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export const ListSize = {
  small: 'small',
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

  get listSizeClass() {
    return `--${this.size}`;
  }
}

</script>

<style src="./List.scss" lang="scss"></style>
