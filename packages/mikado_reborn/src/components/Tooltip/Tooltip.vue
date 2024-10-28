<template>
  <div class="mkr__tooltip">
    <div
      class="mkr__tooltip__anchor"
      ref="anchor"
    >
      <slot />
    </div>
    <div
      :id="`tooltip-${uuid}`"
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
  computed, nextTick, onBeforeUnmount, onMounted, ref, watch,
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
    keepOpen?: boolean
  }>(),
  {
    label: '',
    disabled: false,
    placement: '',
    topLevel: false,
    addScrollListener: false,
  },
);

const uuid = useUuid().generateUUID();
const anchor = ref<HTMLElement | null>(null);
const tooltip = ref<HTMLElement | null>(null);
const opened = ref(false);
const popperInstance = ref<PopperInstance | null>(null);

const isOpened = computed(() => opened.value && !props.disabled);

const updatePopper = async () => {
  await nextTick();
  await popperInstance.value?.update();
};

const setupListeners = () => {
  if (!anchor.value || !tooltip.value) return;


  let hideTimeout: ReturnType<typeof setTimeout>;
  const anchorEl = anchor.value.children[0] as HTMLElement;
  const tooltipEl = tooltip.value;

  const showTooltip = () => {
    clearTimeout(hideTimeout);
    opened.value = true;
  };

  const hideTooltip = () => {
    hideTimeout = setTimeout(() => {
      opened.value = false;
    }, props.keepOpen ? 100 : 0);
  };

  // Ajouter les événements de souris et de focus pour l’ancre
  ['focus', 'mouseenter'].forEach((event) => anchorEl.addEventListener(event, showTooltip));
  ['blur', 'mouseleave'].forEach((event) => anchorEl.addEventListener(event, hideTooltip));

  // Ajouter des écouteurs d'événements sur le tooltip lui-même
  tooltipEl.addEventListener('mouseenter', showTooltip);
  tooltipEl.addEventListener('mouseleave', hideTooltip);

  anchorEl.setAttribute('aria-describedby', `tooltip-${uuid}`);
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

  setupListeners();
}

onBeforeUnmount(() => {
  if (props.topLevel && tooltip.value) {
    tooltip.value.remove();
  }
});

watch(() => opened.value, updatePopper);
watch(() => props.placement, updatePopper);

</script>

<style src="./Tooltip.scss" lang="scss"></style>
