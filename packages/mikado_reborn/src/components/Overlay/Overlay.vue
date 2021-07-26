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
  Component,
  Prop,
  Vue,
  Model,
} from 'vue-property-decorator';

export const colors = {
  dark: 'dark',
  light: 'light',
};

@Component
export default class Modal extends Vue {
  @Model('close', { type: Boolean }) readonly opened!: boolean

  @Prop({
    type: String,
    validator: (value: string): boolean => Object.values(colors).includes(value),
    default: 'dark',
  })
  readonly color!: (keyof typeof colors);

  @Prop({ type: Boolean, default: false })
  readonly keepOnClick!: boolean;

  @Watch('opened', { immediate: true })
  onOpenedChanged(): void {
    if (this.opened) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'visible';
  }

  mounted(): void {
    const app = this.$app;
    app.$el.insertBefore(this.$el, app.$el.children[0]);
  }

  destroyed(): void {
    this.$el.remove();
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
