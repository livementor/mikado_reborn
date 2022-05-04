<template>
  <div
    class="mkr__overlay"
    :class="[
      `mkr__overlay--${color}`,
      {
        'mkr__overlay--opened': opened,
      },
    ]"
    @click="click"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Model, Watch,
} from 'vue-property-decorator';

export const colors = {
  dark: 'dark',
  light: 'light',
};

function setDocumentOverflow(isOpen: boolean): void {
  document.body.style.overflow = isOpen ? 'hidden' : 'visible';
}

@Component
export default class Modal extends Vue {
  @Model('close', { type: Boolean }) readonly opened!: boolean;

  @Prop({
    type: String,
    validator: (value: string): boolean => Object.values(colors).includes(value),
    default: 'dark',
  })
  readonly color!: keyof typeof colors;

  @Prop({ type: Boolean, default: false })
  readonly keepOnClick!: boolean;

  /* eslint-disable */
  @Watch('opened')
  onOpenedChanged(isOpen: boolean): void {
    setDocumentOverflow(isOpen);
  }
  /* eslint-enable */

  mounted(): void {
    setDocumentOverflow(this.opened);

    const app = this.$app;
    app.$el.insertBefore(this.$el, app.$el.children[0]);
  }

  destroyed(): void {
    this.$el?.remove();
    document.body.style.overflow = 'visible';
  }

  click(): void {
    if (!this.keepOnClick) {
      this.$emit('close', false);
    }
    this.$emit('click');
  }
}
</script>

<style src="./Overlay.scss" lang="scss"></style>
