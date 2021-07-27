<template>
  <li :class="classes">
    <a :href="href" @click="emitClick">
      <mkr-icon v-if="icon" :name="icon"/>
      <slot />
    </a>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class NavItem extends Vue {
  @Prop({ type: Boolean })
  active!: boolean;

  @Prop({ type: String })
  href?: string;

  @Prop({ type: String })
  icon?: string;

  get classes(): (string | {[className: string]: boolean;})[] {
    return [
      'mkr__nav-item',
      {
        'mkr__nav-item--icon-only': !this.hasContent,
        'mkr__nav-item--active': this.active,
      },
    ];
  }

  get hasContent(): boolean {
    return Boolean(this.$slots.default?.length);
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
