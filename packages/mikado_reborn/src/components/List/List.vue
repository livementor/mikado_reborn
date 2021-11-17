<template>
  <div class="mkr__list" :class="[bgItemVariantClass, listSizeClass]">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export const BgItemVariant = {
  odd: 'odd',
  even: 'even',
  hover: 'hover',
};

export const ListSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

@Component
export default class List extends Vue {
  @Prop({
    type: String,
    default: undefined,
    validator: (variant) => Object.values(BgItemVariant).includes(variant) || variant === undefined,
  })
  bgItemVariant?: keyof typeof BgItemVariant

  @Prop({
    type: String,
    default: ListSize.medium,
    validator: (variant) => Object.values(ListSize).includes(variant),
  })
  size!: keyof typeof ListSize

  get bgItemVariantClass() {
    return this.bgItemVariant ? `--${this.bgItemVariant}` : undefined;
  }

  get listSizeClass() {
    return `--${this.size}`;
  }
}

</script>

<style src="./List.scss" lang="scss"></style>
