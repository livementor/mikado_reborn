<template>
  <div
    class="mkr__tooltip"
    disabled="false"
  >
    <div
      class="mkr__tooltip__anchor"
      ref="anchor"
      @click="onClick"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
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

let hideTimeout: ReturnType<typeof setTimeout>;

const onClick = (e: PointerEvent) => {
  e.stopPropagation()
  if ( !props.disabled ) {
    showTooltip()
  }
}

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

const wrapper = ref<HTMLElement | null>(null)
const handleClickOutside = (event: MouseEvent) => {
  if (wrapper.value && !wrapper.value.contains(event.target as Node)) {
    hideTooltip()
  }
}

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

  document.addEventListener('click', handleClickOutside)
  
}

onBeforeUnmount(() => {
  if (props.topLevel && tooltip.value) {
    tooltip.value.remove();
  }
  document.removeEventListener('click', handleClickOutside)

});

watch(() => opened.value, updatePopper);
watch(() => props.placement, updatePopper);

</script>

<style src="./Tooltip.scss" lang="scss"></style>
