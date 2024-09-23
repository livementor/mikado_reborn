<template>
  <div ref="modalRef" v-if="value">
    <mkr-overlay v-if="overlay" :value="value" />
    <mkr-card
      role="dialog"
      :aria-modal="value"
      class="mkr__modal"
      :class="[
        `mkr__modal--${size}`,
        {
          'mkr__modal--opened': value,
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
            @click="emit('input', false)"
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

<script lang="ts" setup>
import {
  defineProps, withDefaults, defineEmits, inject, onMounted, ref, onUnmounted, watch, nextTick,
} from 'vue';
import { MkrCard } from '../Card';
import { MkrOverlay } from '../Overlay';
import { MkrTextButton } from '../Button';
import focusTrap from './focusTrap';

const modalRef = ref(null);

const props = withDefaults(
  defineProps<{
    size?: 'medium' | 'large',
    slim?: boolean,
    closeable?: boolean,
    overlay?: boolean,
    scrollable?: boolean,
    focusFirstSelector?: string,
    noHeader?: boolean,
    value?: boolean, // in order to use native v-model => original name = "opened"
  }>(),
  {
    size: 'medium',
    slim: false,
    closeable: true,
    overlay: false,
    scrollable: false,
    focusFirstSelector: null,
    noHeader: false,
    value: false,
  },
);

const emit = defineEmits(['input']);

// dom manipulation
const appRef = inject('appRef');
const modalContent = ref(null);
const teleportModalToAppElement = () => {
  appRef.value.insertBefore(modalRef.value, appRef.value.children[0]);
};
const removeModalFromDom = () => {
  modalRef.value?.remove();
};

// focus trap
let focusTrapListenerCleanup: ReturnType<typeof focusTrap> = null;
const focusSelector = () => {
  if (modalRef.value) {
    focusTrapListenerCleanup = focusTrap({
      el: modalRef.value,
      focusElement: modalRef.value.querySelector(props.focusFirstSelector),
    });
  }
};

// clicks and keys
const onClickOutside = (event: MouseEvent) => {
  const target = event.target as Node | null;
  if (!target) return;

  const isClickInModal = modalRef.value.contains(event.target as Node);
  if (!isClickInModal) emit('input', false);
};
const keydownHandler = (event: KeyboardEvent) => {
  if (event.key === 'Escape') emit('input', false);
};

// scroll state
let isScrolled = ref(false);
let isFullyScrolled = ref(false);
let hasScroll = ref(false);
const setScrollState = (event?: UIEvent) => {
  if (!props.scrollable) return;

  setTimeout(() => {
    const target = (event?.target as Element) ?? modalContent;

    if (!target) return;

    isScrolled = target.scrollTop >= 20;
    hasScroll = target.clientHeight < target.scrollHeight;
    isFullyScrolled = target.scrollHeight - target.scrollTop - target.clientHeight < 20;
  }, 200);
};

// listeners
const initCloseEventListeners = () => {
  document.addEventListener('mousedown', onClickOutside);
  document.addEventListener('keydown', keydownHandler);
};
const removeCloseEventListeners = () => {
  document.removeEventListener('mousedown', onClickOutside);
  document.removeEventListener('keydown', keydownHandler);
};
const toggleEventListeners = (isOpened: boolean) => {
  if (isOpened) initCloseEventListeners();
  else removeCloseEventListeners();
};
const onCloseableChanged = (isCloseable: boolean) => {
  if (isCloseable) initCloseEventListeners();
  else removeCloseEventListeners();
};

const onOpenedChanged = async (isOpened: boolean) => {
  if (isOpened) {
    await nextTick();
    teleportModalToAppElement();
    focusSelector();
    if (props.scrollable) setScrollState();
  } else {
    (focusTrapListenerCleanup as ReturnType<typeof focusTrap>)?.();
    removeModalFromDom();
  }

  if (!props.closeable) return;
  toggleEventListeners(isOpened);
};

// lifecycle hooks
onMounted(() => {
  toggleEventListeners(props.value);
});

onUnmounted(() => {
  removeModalFromDom();
  (focusTrapListenerCleanup as ReturnType<typeof focusTrap>)?.();
  if (props.closeable) removeCloseEventListeners();
});

// watchers
watch(() => props.closeable, onCloseableChanged);
watch(() => props.value, onOpenedChanged);

</script>

<style src="./Modal.scss" lang="scss"></style>
