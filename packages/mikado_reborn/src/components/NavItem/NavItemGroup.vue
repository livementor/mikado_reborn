<template>
  <ul class="mkr__nav-item-group" :class="`mkr__nav-item-group--${type}`">
    <slot />
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export const NavItemTypes = {
  main: 'main',
  sub: 'sub',
  'sub-light': 'light',
};

@Component
export default class NavItemGroup extends Vue {
  @Prop({
    default: NavItemTypes.main,
    validator: (type) => Object.values(NavItemTypes).includes(type),
  })
  type!: string
}
</script>
<style src="./NavItemGroup.scss" lang="scss"></style>
