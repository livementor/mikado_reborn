<template>
  <div ref="modalRef" v-if="isModalOpened">
    <mkr-overlay v-if="overlay" :value="isModalOpened" />
    <mkr-card
      role="dialog"
      :aria-modal="isModalOpened"
      class="mkr__modal"
      :class="[
        `mkr__modal--${size}`,
        {
          'mkr__modal--opened': isModalOpened,
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
            @click="close()"
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
  withDefaults, inject, onMounted, ref, onUnmounted, watch, nextTick, computed, Ref,
} from 'vue';
import { MkrCard } from '../Card';
import { MkrOverlay } from '../Overlay';
import { MkrTextButton } from '../Button';
import focusTrap from './focusTrap';

const props = withDefaults(
  defineProps<{
    size?: 'medium' | 'large',
    slim?: boolean,
    closeable?: boolean,
    overlay?: boolean,
    scrollable?: boolean,
    focusFirstSelector?: string | null,
    noHeader?: boolean,
    value?: boolean,
    opened?: boolean
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

const isModalOpened = computed(() => props.value || props.opened);

const emit = defineEmits(['close', 'input']);

// dom manipulation
const appRef = inject<Ref<HTMLElement>>('appRef');
const modalRef = ref<HTMLElement | null>(null);

const close = () => {
  emit('close');
  emit('input', false);
};

const modalContent = ref(null);
const teleportModalToAppElement = () => {
  if (!modalRef.value) return;
  appRef?.value.insertBefore(modalRef.value, appRef.value.children[0]);
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

  const isClickInModal = modalRef.value?.contains(event.target as Node);
  if (!isClickInModal) close();
};
const keydownHandler = (event: KeyboardEvent) => {
  if (event.key === 'Escape') close();
};

// scroll state
const isScrolled = ref(false);
const isFullyScrolled = ref(false);
const hasScroll = ref(false);
const setScrollState = (event?: UIEvent) => {
  if (!props.scrollable) return;

  setTimeout(() => {
    const target = (event?.target as Element) ?? modalContent;

    if (!target) return;

    isScrolled.value = target.scrollTop >= 20;
    hasScroll.value = target.clientHeight < target.scrollHeight;
    isFullyScrolled.value = target.scrollHeight - target.scrollTop - target.clientHeight < 20;
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
