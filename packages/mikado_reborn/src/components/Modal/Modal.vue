<template>
  <div>
    <Teleport
      to=".mkr__app"
      v-if="isMounted"
    >
      <div
        :class="$attrs.class"
        v-if="isModalOpened"
      >
        <mkr-overlay
          v-if="overlay"
          @click="closeIfAllowed"
        />
        <mkr-card
          ref="modalRef"
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
          <div
            class="mkr__modal__header"
            v-if="!noHeader"
          >
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
          <div
            ref="modalContent"
            class="mkr__modal__content"
            @scroll="setScrollState"
          >
            <slot />
          </div>
          <div
            class="mkr__modal__footer"
            v-if="$slots['footer']"
          >
            <slot name="footer" />
          </div>
        </mkr-card>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import {
  ref, computed, onMounted
} from 'vue';
import { MkrCard } from '../Card';
import { MkrOverlay } from '../Overlay';
import { MkrTextButton } from '../Button';
import { onClickOutside, onKeyStroke } from '@vueuse/core';

const model = defineModel();

const props = withDefaults(
  defineProps<{
    size?: 'medium' | 'large',
    opened?: boolean,
    slim?: boolean,
    closeable?: boolean,
    overlay?: boolean,
    scrollable?: boolean,
    focusFirstSelector?: string | null,
    noHeader?: boolean,
  }>(),
  {
    size: 'medium',
    slim: false,
    closeable: true,
    overlay: true,
    scrollable: false,
    focusFirstSelector: null,
    noHeader: false,
  },
);

const isMounted = ref(false);
onMounted(() => isMounted.value = true);

const emit = defineEmits(['close']);

const isModalOpened = computed(() => model.value || props.opened);

const modalRef = ref<HTMLElement | null>(null);
const modalContent = ref(null);

const closeIfAllowed = () => {
  if (props.closeable) {
    close();
  }
}

onClickOutside(modalRef, closeIfAllowed)

onKeyStroke('Escape', closeIfAllowed)

const close = () => {
  model.value = false;
  emit('close')
}

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
</script>

<style src="./Modal.scss" lang="scss"></style>
