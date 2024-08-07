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
import { defineComponent } from "vue";

export const NavItemTypes = {
  main: 'main',
  sub: 'sub',
  'sub-light': 'sub-light',
};

export default defineComponent({
    props: {
        type: {
                default: NavItemTypes.main,
                validator: (type: string) => Object.values(NavItemTypes).includes(type),
            type: String
        },
        topNav: { type: Boolean, default: false },
        horizontal: { type: Boolean, default: false }
    }
})

</script>
<style src="./NavItemGroup.scss" lang="scss"></style>
