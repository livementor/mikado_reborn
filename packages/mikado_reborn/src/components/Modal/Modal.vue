<template>
  <mkr-card
    role="dialog"
    :aria-modal="opened"
    class="mkr__modal"
    :class="[
      `mkr__modal--${size}`,
      {
        'mkr__modal--opened': opened,
        'mkr__modal--slim': slim,
      }
    ]"
    elevated
    radius="large"
  >
    <div class="mkr__modal__header">
      <mkr-interactive-icon
        name="cross"
        @click="$emit('close', false)"
        color="neutral"
      />
    </div>
    <div class="mkr__modal__content">
      <slot />
    </div>
  </mkr-card>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Model,
  Prop,
} from 'vue-property-decorator';
import { MkrCard } from '../Card';
import { MkrInteractiveIcon } from '../InteractiveIcon';

export const sizes = {
  medium: 'medium',
  large: 'large',
};

@Component({
  components: {
    MkrCard,
    MkrInteractiveIcon,
  },
})
export default class Modal extends Vue {
  @Model('close', { type: Boolean }) readonly opened!: boolean

  @Prop({
    type: String,
    validator: (value: string): boolean => Object.values(sizes).includes(value),
    default: 'medium',
  })
  readonly size!: (keyof typeof sizes);

  @Prop({ type: Boolean, default: false })
  readonly slim!: boolean;

  mounted(): void {
    const app = this.$app;
    app.$el.insertBefore(this.$el, app.$el.children[0]);
    document.addEventListener('mousedown', this.onClickOutside);
    document.addEventListener('keydown', this.keydownHandler);
  }

  destroyed(): void {
    this.$el.remove();
    document.removeEventListener('mousedown', this.onClickOutside);
    document.removeEventListener('keydown', this.keydownHandler);
  }

  onClickOutside(event: MouseEvent): void {
    const target = (event.target as Node | null);
    if (!target) {
      return;
    }
    const isClickInModal = this.$el.contains(event.target as Node);
    if (!isClickInModal) {
      this.$emit('close', false);
    }
  }

  keydownHandler(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.$emit('close', false);
    }
  }
}
</script>

<style src="./Modal.scss" lang="scss"></style>
