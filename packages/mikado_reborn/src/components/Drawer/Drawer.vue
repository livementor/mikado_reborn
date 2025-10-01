<template>
  <Teleport
    to=".mkr__app"
    v-if="isMounted"
  >
    <div
      :class="$attrs.class"
      style="pointer-events: none;"
    >
      <div
        v-if="overlay"
        ref="overlayRef"
        class="mkr__drawer__overlay"
        :class="{ 'mkr__drawer__overlay--visible': isDrawerOpened }"
        @click="closeIfAllowed"
      />
      <mkr-card
        ref="drawerRef"
        role="dialog"
        :aria-modal="isDrawerOpened"
        class="mkr__drawer"
        :class="{
          'mkr__drawer--opened': isDrawerOpened,
          'mkr__drawer--inset': inset,
          'mkr__drawer--scrollable': scrollable,
        }"
        elevated
        radius="large"
      >
        <div
          class="mkr__drawer__handle"
          v-if="handle"
          @mousedown="onDragStart"
          @touchstart="onDragStart"
        >
          <span class="mkr__drawer__handle__bar" />
        </div>
        <div
          class="mkr__drawer__header"
          v-if="!noHeader"
        >
          <slot name="header">
            <mkr-text-button
              v-if="closeable"
              class="mkr__drawer__header__close"
              type="button"
              icon="cross"
              size="small"
              @click="close()"
            />
            <slot name="title" />
          </slot>
        </div>
        <div
          ref="drawerContent"
          class="mkr__drawer__content"
        >
          <slot />
        </div>
        <div
          class="mkr__drawer__footer"
          v-if="$slots['footer']"
        >
          <slot name="footer" />
        </div>
      </mkr-card>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import {
  ref, computed, onMounted
} from 'vue';
import { MkrCard } from '../Card';
import { MkrTextButton } from '../Button';
import { onClickOutside, onKeyStroke } from '@vueuse/core';

const model = defineModel();

const props = withDefaults(
  defineProps<{
    opened?: boolean,
    inset?: boolean,
    handle?: boolean,
    closeable?: boolean,
    overlay?: boolean,
    scrollable?: boolean,
    dismissible?: boolean,
    noHeader?: boolean,
  }>(),
  {
    inset: false,
    handle: true,
    closeable: true,
    overlay: true,
    scrollable: true,
    dismissible: true,
    noHeader: false,
  },
);

const isMounted = ref(false);
onMounted(() => isMounted.value = true);

const emit = defineEmits(['close']);

const isDrawerOpened = computed(() => model.value || props.opened);

const drawerRef = ref<HTMLElement | null>(null);
const drawerContent = ref(null);
const overlayRef = ref<HTMLElement | null>(null);

// Get the actual DOM element from the Card component ref
const getDrawerElement = (): HTMLElement | null => {
  if (!drawerRef.value) return null;
  // MkrCard is a component, we need the $el property to get the DOM element
  return (drawerRef.value as any).$el || drawerRef.value;
};

const closeIfAllowed = () => {
  if (props.closeable && props.dismissible) {
    close();
  }
}

onClickOutside(drawerRef, closeIfAllowed)

onKeyStroke('Escape', closeIfAllowed)

const close = () => {
  model.value = false;
  emit('close')
}

// Handle drag functionality
const isDragging = ref(false);
const startY = ref(0);
const currentTranslate = ref(0);

const onDragStart = (e: MouseEvent | TouchEvent) => {
  if (!props.handle || !props.dismissible) return;

  // Only preventDefault for mouse events, not touch (causes warning)
  if (e.type === 'mousedown') {
    e.preventDefault();
  }
  e.stopPropagation();

  isDragging.value = true;
  startY.value = 'touches' in e ? e.touches[0].clientY : e.clientY;
  currentTranslate.value = 0;

  const element = getDrawerElement();
  if (element) {
    element.style.transition = 'none';
  }

  // Also remove transition from overlay for smooth dragging
  if (overlayRef.value) {
    overlayRef.value.style.transition = 'none';
  }

  // Add listeners to window/document
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchmove', onDragMove, { passive: false });
  window.addEventListener('touchend', onDragEnd);
};

const onDragMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;

  e.preventDefault();

  const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  const deltaY = currentY - startY.value;

  // Only allow dragging down
  if (deltaY > 0) {
    currentTranslate.value = deltaY;
    const element = getDrawerElement();
    if (element) {
      element.style.transform = `translateY(${deltaY}px)`;
    }

    // Update overlay opacity based on drag distance
    // Max drag distance for full fade is 300px
    if (overlayRef.value) {
      const maxDragDistance = 300;
      const opacity = Math.max(0, 1 - (deltaY / maxDragDistance));
      overlayRef.value.style.opacity = opacity.toString();
    }
  }
};

const onDragEnd = () => {
  if (!isDragging.value) return;

  isDragging.value = false;

  const element = getDrawerElement();
  if (element) {
    element.style.transition = '';
    element.style.transform = '';
  }

  // Restore overlay transition and opacity
  if (overlayRef.value) {
    overlayRef.value.style.transition = '';
    overlayRef.value.style.opacity = '';
  }

  // Close if dragged more than 100px down
  if (currentTranslate.value > 100) {
    close();
  }

  currentTranslate.value = 0;

  // Remove listeners
  window.removeEventListener('mousemove', onDragMove);
  window.removeEventListener('mouseup', onDragEnd);
  window.removeEventListener('touchmove', onDragMove);
  window.removeEventListener('touchend', onDragEnd);
};
</script>

<style src="./Drawer.scss" lang="scss"></style>
