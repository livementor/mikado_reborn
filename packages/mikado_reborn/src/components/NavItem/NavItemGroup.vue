<template>
  <ul
    class="mkr__nav-item-group"
    :class="[
      `mkr__nav-item-group--${type}`,
      { 'mkr__nav-item-group--top-nav': topNav },
    ]"
  >
    <slot />
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export const NavItemTypes = {
  main: 'main',
  sub: 'sub',
  'sub-light': 'sub-light',
};

@Component
export default class NavItemGroup extends Vue {
  @Prop({
    default: NavItemTypes.main,
    validator: (type) => Object.values(NavItemTypes).includes(type),
  })
  type!: string

  @Prop({ type: Boolean, default: false })
  topNav!: boolean;
}
</script>
<style src="./NavItemGroup.scss" lang="scss"></style>
