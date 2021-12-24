<template>
  <div v-if="opened">
    <mkr-overlay v-if="overlay" :opened="opened" />
    <mkr-card
      role="dialog"
      :aria-modal="opened"
      class="mkr__modal"
      :class="[
        `mkr__modal--${size}`,
        {
          'mkr__modal--opened': opened,
          'mkr__modal--slim': slim,
          'mkr__modal--scrollable': scrollable,
          'mkr__modal--scrolled': isScrolled && scrollable,
          'mkr__modal--has-scroll': hasScroll && scrollable,
          'mkr__modal--fully-scrolled': isFullyScrolled && scrollable,
        },
      ]"
      elevated
      radius="large"
    >
      <div class="mkr__modal__header">
        <mkr-text-button
          class="mkr__modal__header__close"
          type="button"
          icon="cross"
          size="small"
          @click="onClickClose"
        />
        <slot name="title" />
      </div>
      <div ref="modalContent" class="mkr__modal__content" @scroll="setScrollState">
        <slot />
      </div>
      <div class="mkr__modal__footer" v-if="$slots['footer']">
        <slot name="footer" />
      </div>
    </mkr-card>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
  Model,
} from 'vue-property-decorator';
import { MkrCard } from '../Card';
import { MkrInteractiveIcon } from '../InteractiveIcon';
import { MkrOverlay } from '../Overlay';
import { MkrTextButton } from '../Button';
import focusTrap from './focusTrap';

export const sizes = {
  medium: 'medium',
  large: 'large',
};

@Component({
  components: {
    MkrCard,
    MkrInteractiveIcon,
    MkrOverlay,
    MkrTextButton,
  },
})
export default class Modal extends Vue {
  @Model('close', { type: Boolean, default: false })
  readonly opened!: boolean;

  @Prop({
    type: String,
    validator: (value: string): boolean => Object.values(sizes).includes(value),
    default: 'medium',
  })
  readonly size!: keyof typeof sizes;

  @Prop({ type: Boolean, default: false })
  readonly slim!: boolean;

  @Prop({ type: Boolean, default: true })
  readonly closeable!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly overlay!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly scrollable!: boolean;

  @Prop({ type: String, default: null })
  readonly focusFirstSelector!: string;

  focusTrapListenerCleanup: ReturnType<typeof focusTrap> = null;

  isScrolled = false

  isFullyScrolled = false

  hasScroll = false

  $refs!: {
    modalContent: HTMLDivElement;
  };

  @Watch('closeable')
  onCloseableChanged(isCloseable: boolean): void {
    if (isCloseable) {
      this.initCloseEventListeners();
      return;
    }
    this.removeCloseEventListeners();
  }

  @Watch('opened', { immediate: true })
  async onIsOpenedChanged(isOpened: boolean): Promise<void> {
    if (isOpened) {
      await this.$nextTick();
      const app = this.$app;
      app.$el.insertBefore(this.$el, app.$el.children[0]);

      if (this.scrollable) {
        this.setScrollState();
      }

      const modalRef = this.$refs.modalContent;

      this.focusTrapListenerCleanup = focusTrap({
        el: modalRef,
        focusElement: modalRef.querySelector<HTMLElement>(this.focusFirstSelector),
      });
    } else if (this.focusTrapListenerCleanup) {
      this.focusTrapListenerCleanup();
    }

    if (!this.closeable) return;

    if (isOpened) {
      this.initCloseEventListeners();
    } else {
      this.removeCloseEventListeners();
    }
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
    const target = event.target as Node | null;
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

  setScrollState(event?: UIEvent) {
    if (!this.scrollable) return;

    setTimeout(() => {
      const target = event?.target as Element ?? this.$refs.modalContent;

      if (!target) return;

      const isScrolled = target.scrollTop >= 20;
      const hasScroll = target.clientHeight < target.scrollHeight;
      const isFullyScrolled = target.scrollHeight - target.scrollTop - target.clientHeight < 20;

      this.isScrolled = isScrolled;
      this.isFullyScrolled = isFullyScrolled;
      this.hasScroll = hasScroll;
    }, 200);
  }
}
</script>

<style src="./Modal.scss" lang="scss"></style>
