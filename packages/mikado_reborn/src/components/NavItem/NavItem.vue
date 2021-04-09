<template>
  <li :class="classes">
    <slot />
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class NavItem extends Vue {
  @Prop({ type: Boolean })
  active!: boolean;

  get classes(): (string | {[className: string]: boolean;})[] {
    return [
      'mkr__nav-item',
      {
        'mkr__nav-item--active': this.active,
      },
    ];
  }

  /**
   * Passthrough click event
   */
  emitClick(event: MouseEvent): void {
    this.$emit('click', event);
  }
}
</script>
<style src="./NavItem.scss" lang="scss"></style>
