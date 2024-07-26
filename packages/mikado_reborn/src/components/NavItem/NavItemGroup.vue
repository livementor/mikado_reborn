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
    validator: (type: string) => Object.values(NavItemTypes).includes(type),
  })
  type!: string;

  @Prop({ type: Boolean, default: false })
  topNav!: boolean;

  @Prop({ type: Boolean, default: false })
  horizontal!: boolean;
}
</script>
<style src="./NavItemGroup.scss" lang="scss"></style>
