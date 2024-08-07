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
      <div class="mkr__modal__header" v-if="!noHeader">
        <slot name="header">
          <mkr-text-button
            v-if="closeable"
            class="mkr__modal__header__close"
            type="button"
            icon="cross"
            size="small"
            @click="onClickClose"
          />
          <slot name="title" />
        </slot>
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
import { MkrCard } from '../Card';
import { MkrInteractiveIcon } from '../InteractiveIcon';
import { MkrOverlay } from '../Overlay';
import { MkrTextButton } from '../Button';
import focusTrap from './focusTrap';
import { defineComponent } from "vue";

export const sizes = {
  medium: 'medium',
  large: 'large',
};

export default defineComponent({
  components: {
    MkrCard,
    MkrInteractiveIcon,
    MkrOverlay,
    MkrTextButton,
  },
    data() {
        const $refs: {
                modalContent: HTMLDivElement;
              } = undefined;
        const focusTrapListenerCleanup: ReturnType<typeof focusTrap> = null;

        return {
            focusTrapListenerCleanup,
            isScrolled: false,
            isFullyScrolled: false,
            hasScroll: false,
            $refs
        };
    },
    mounted() {
        this.toggleEventListeners(this.opened);
    },
    destroyed(): void {
        this.removeModalFromDom();
        this.focusTrapListenerCleanup?.();
        if (this.closeable) this.removeCloseEventListeners();
    },
    methods: {
        toggleEventListeners(isOpened: boolean) {
            if (isOpened) {
              this.initCloseEventListeners();
            } else {
              this.removeCloseEventListeners();
            }
        },
        teleportModalToAppElement(): void {
            const app = this.$app;
            app.$el.insertBefore(this.$el, app.$el.children[0]);
        },
        removeModalFromDom(): void {
            this.$el?.remove();
        },
        initCloseEventListeners(): void {
            document.addEventListener('mousedown', this.onClickOutside);
            document.addEventListener('keydown', this.keydownHandler);
        },
        removeCloseEventListeners(): void {
            document.removeEventListener('mousedown', this.onClickOutside);
            document.removeEventListener('keydown', this.keydownHandler);
        },
        focusSelector(): void {
            const modalRef = this.$refs.modalContent;

                this.focusTrapListenerCleanup = focusTrap({
                  el: modalRef,
                  focusElement: modalRef.querySelector<HTMLElement>(this.focusFirstSelector),
                });
        },
        onClickClose(): void {
            this.$emit('close', false);
        },
        onClickOutside(event: MouseEvent): void {
            const target = event.target as Node | null;
            if (!target) {
              return;
            }
            const isClickInModal = this.$el.contains(event.target as Node);
            if (!isClickInModal) {
              this.$emit('close', false);
            }
        },
        keydownHandler(event: KeyboardEvent): void {
            if (event.key === 'Escape') {
              this.$emit('close', false);
            }
        },
        setScrollState(event?: UIEvent) {
            if (!this.scrollable) return;

                setTimeout(() => {
                  const target = (event?.target as Element) ?? this.$refs.modalContent;

                  if (!target) return;

                  const isScrolled = target.scrollTop >= 20;
                  const hasScroll = target.clientHeight < target.scrollHeight;
                  const isFullyScrolled = target.scrollHeight - target.scrollTop - target.clientHeight < 20;

                  this.isScrolled = isScrolled;
                  this.isFullyScrolled = isFullyScrolled;
                  this.hasScroll = hasScroll;
                }, 200);
        },
        onCloseableChanged(isCloseable: boolean): void {
            if (isCloseable) {
              this.initCloseEventListeners();
            } else {
              this.removeCloseEventListeners();
            }
        },
        async onOpenedChanged(isOpened: boolean): Promise<void> {
            if (isOpened) {
                  await this.$nextTick();
                  this.teleportModalToAppElement();
                  this.focusSelector();

                  if (this.scrollable) {
                    this.setScrollState();
                  }
                } else {
                  this.focusTrapListenerCleanup?.();
                  this.removeModalFromDom();
                }

                if (!this.closeable) return;

                this.toggleEventListeners(isOpened);
        }
    },
    props: {
        size: {
                type: String,
                validator: (value: string): boolean => Object.values(sizes).includes(value),
                default: 'medium',
              },
        slim: { type: Boolean, default: false },
        closeable: { type: Boolean, default: true },
        overlay: { type: Boolean, default: false },
        scrollable: { type: Boolean, default: false },
        focusFirstSelector: { type: String, default: null },
        noHeader: { type: Boolean, default: false },
        opened: { type: Boolean, default: false }
    },
    model: {
        prop: "opened",
        event: "close"
    },
    watch: {
        "closeable": [{
            handler: "onCloseableChanged"
        }],
        "opened": [{
            handler: "onOpenedChanged"
        }]
    }
})

</script>

<style src="./Modal.scss" lang="scss"></style>
