<template>
  <div
    ref="wrapper"
    class="mkr__tooltip"
    disabled="false"
  >
    <div
      class="mkr__tooltip__anchor"
      ref="anchor"
      @click="onClick"
      @pointerdown="onPointerDown"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
    >
      <div>
        <slot />
      </div>
    </div>
    <div
      :id="`tooltip-${uuid}`"
      v-bind="$attrs"
      class="mkr__tooltip__label"
      ref="tooltip"
      :class="{ 'mkr__tooltip__label--hidden': !isOpened }"
      role="tooltip"
      :aria-hidden="!isOpened"
    >
      <template v-if="label">
        {{ label }}
      </template>
      <slot
        name="content"
        v-else
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed, nextTick, onBeforeUnmount, onMounted, ref, watch
} from 'vue';
import { createPopper, Instance as PopperInstance, Placement } from '@popperjs/core';
import useUuid from '../../composables/useUuid';

const props = withDefaults(
  defineProps<{
    label?: string,
    disabled?: boolean,
    placement?: Placement,
    topLevel?: boolean,
    addScrollListener?: boolean,
    keepOpen?: boolean,
    closeOnScroll?: boolean,
  }>(),
  {
    label: '',
    disabled: false,
    placement: undefined,
    topLevel: false,
    addScrollListener: false,
    closeOnScroll: false,
  },
);

const uuid = useUuid().generateUUID();
const wrapper = ref<HTMLElement | null>(null);
const anchor = ref<HTMLElement | null>(null);
const tooltip = ref<HTMLElement | null>(null);
const opened = ref(false);
const popperInstance = ref<PopperInstance | null>(null);

const isOpened = computed(() => opened.value && !props.disabled);

const updatePopper = async () => {
  await nextTick();
  await popperInstance.value?.update();
};

let hideTimeout: ReturnType<typeof setTimeout>;

// Touch devices have no hover: a tap toggles the tooltip instead of only opening it,
// and emulated mouse events must not reopen it right after.
let lastPointerType = '';
const isTouch = (pointerType: string) => pointerType === 'touch';

const showTooltip = () => {
  if ( !props.disabled ) {
    clearTimeout(hideTimeout);
    opened.value = true;
  }
}

const hideTooltip = () => {
  hideTimeout = setTimeout(() => {
    opened.value = false;
  }, props.keepOpen ? 100 : 0);
};

const closeTooltip = () => {
  clearTimeout(hideTimeout);
  opened.value = false;
};

const onPointerDown = (e: PointerEvent) => {
  lastPointerType = e.pointerType;
};

const onPointerEnter = (e: PointerEvent) => {
  if (!isTouch(e.pointerType)) showTooltip();
};

const onPointerLeave = (e: PointerEvent) => {
  if (!isTouch(e.pointerType)) hideTooltip();
};

const onClick = (e: MouseEvent) => {
  e.stopPropagation()
  if ( props.disabled ) return;

  if (isTouch(lastPointerType) && opened.value) {
    closeTooltip();
  } else {
    showTooltip();
  }
  lastPointerType = '';
}

const isInside = (target: EventTarget | null) => {
  const node = target as Node | null;
  return !!node && (!!wrapper.value?.contains(node) || !!tooltip.value?.contains(node));
};

const onDocumentPointerDown = (e: PointerEvent) => {
  if (!isInside(e.target)) closeTooltip();
};

const onDocumentScroll = () => closeTooltip();

const addGlobalListeners = () => {
  document.addEventListener('pointerdown', onDocumentPointerDown, true);
  if (props.closeOnScroll) {
    document.addEventListener('scroll', onDocumentScroll, { capture: true, passive: true });
  }
};

const removeGlobalListeners = () => {
  document.removeEventListener('pointerdown', onDocumentPointerDown, true);
  document.removeEventListener('scroll', onDocumentScroll, true);
};

// lifecycle hooks
onMounted(() => resetPopper());
const resetPopper = () => {
  if (props.topLevel && tooltip.value) {
    const tooltipContainer = document.getElementById('tooltip-container') as HTMLElement;
    if (tooltipContainer) {
      tooltipContainer.appendChild(tooltip.value);
    }
  }

  if (!anchor.value || !tooltip.value) return;

  popperInstance.value = createPopper(anchor.value, tooltip.value, {
    placement: props.placement || 'bottom',
    modifiers: [
      { name: 'offset', options: { offset: [0, 4] } },
      { name: 'eventListeners', options: { scroll: props.addScrollListener } },
    ],
  });
}

onBeforeUnmount(() => {
  removeGlobalListeners();
  clearTimeout(hideTimeout);
  popperInstance.value?.destroy();
  if (props.topLevel && tooltip.value) {
    tooltip.value.remove();
  }
});

watch(isOpened, (open) => {
  if (open) {
    addGlobalListeners();
  } else {
    removeGlobalListeners();
  }
  updatePopper();
});
watch(() => props.placement, updatePopper);

</script>

<style src="./Tooltip.scss" lang="scss"></style>
