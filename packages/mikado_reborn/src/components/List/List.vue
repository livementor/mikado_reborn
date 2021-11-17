<template>
  <div class="mkr__list" :class="[bgItemVariantClass]">
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

@Component
export default class List extends Vue {
  @Prop({
    type: String,
    default: undefined,
    validator: (variant) => Object.values(BgItemVariant).includes(variant) || variant === undefined,
  })
  bgItemVariant?: keyof typeof BgItemVariant

  get bgItemVariantClass() {
    return this.bgItemVariant ? `--${this.bgItemVariant}` : undefined;
  }
}

</script>

<style src="./List.scss" lang="scss"></style>
