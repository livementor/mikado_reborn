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
import { defineComponent } from 'vue';

export const colors = {
  dark: 'dark',
  light: 'light',
};

function setDocumentOverflow(isOpen: boolean): void {
  document.body.style.overflow = isOpen ? 'hidden' : 'visible';
}

export default defineComponent({
  mounted(): void {
    setDocumentOverflow(this.opened);

    const app = window.document.querySelector('.mkr__app') as HTMLElement;
    app.insertBefore(this.$el, app.children[0]);
  },
  destroyed(): void {
    this.$el?.remove();
    document.body.style.overflow = 'visible';
  },
  methods: {
    click(): void {
      if (!this.keepOnClick) {
        this.$emit('close', false);
      }
      this.$emit('click');
    },
    onOpenedChanged(isOpen: boolean): void {
      setDocumentOverflow(isOpen);
    },
  },
  props: {
    color: {
      type: String,
      validator: (value: string): boolean => Object.values(colors).includes(value),
      default: 'dark',
    },
    keepOnClick: { type: Boolean, default: false },
    opened: { type: Boolean },
  },
  model: {
    prop: 'opened',
    event: 'close',
  },
  watch: {
    opened: [{
      handler: 'onOpenedChanged',
    }],
  },
});

</script>

<style src="./Overlay.scss" lang="scss"></style>
