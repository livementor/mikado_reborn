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
    <mkr-interactive-icon
      v-if="closeable"
      class="mkr__modal__close"
      name="cross"
      color="neutral"
      @click="onClickClose"
    />
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
  Watch,
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

  @Prop({ type: Boolean, default: true })
  readonly closeable!: boolean;

  @Watch('closeable')
  onCloseableChanged(isCloseable: boolean): void {
    if (isCloseable) {
      this.initCloseEventListeners();
      return;
    }
    this.removeCloseEventListeners();
  }

  mounted(): void {
    const app = this.$app;
    app.$el.insertBefore(this.$el, app.$el.children[0]);
    if (this.closeable) this.initCloseEventListeners();
  }

  destroyed(): void {
    this.$el.remove();
    if (this.closeable) this.removeCloseEventListeners();
  }

  initCloseEventListeners(): void {
    document.addEventListener('mousedown', this.onClickOutside);
    document.addEventListener('keydown', this.keydownHandler);
  }

  removeCloseEventListeners(): void {
    document.removeEventListener('mousedown', this.onClickOutside);
    document.removeEventListener('keydown', this.keydownHandler);
  }

  onClickClose(): void {
    this.$emit('close', false);
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