<template>
  <div class="mkr__tooltip">
    <div class="mkr__tooltip__anchor" ref="anchor">
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
      <slot name="content" v-else />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, computed, onMounted, onBeforeUnmount, nextTick, watch,
} from 'vue';
import { createPopper, Instance as PopperInstance, Placement } from '@popperjs/core';
import useUuid from '../../composables/useUuid';

export default defineComponent({
  props: {
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    placement: { type: String as () => Placement, default: '' },
    topLevel: { type: Boolean, default: false },
    addScrollListener: { type: Boolean, default: false },
  },
  setup(props) {
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

      const anchorEl = anchor.value.children[0] as HTMLElement;
      const events = {
        show: () => {
          opened.value = true;
        },
        hide: () => {
          opened.value = false;
        },
      };

      ['focus', 'mouseenter'].forEach((event) => anchorEl.addEventListener(event, events.show));
      ['blur', 'mouseleave'].forEach((event) => anchorEl.addEventListener(event, events.hide));

      anchorEl.setAttribute('aria-describedby', `tooltip-${uuid}`);
    };

    onMounted(() => {
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
    });

    onBeforeUnmount(() => {
      if (props.topLevel && tooltip.value) {
        tooltip.value.remove();
      }
    });

    watch(() => opened.value, updatePopper);

    return {
      uuid,
      anchor,
      tooltip,
      isOpened,
    };
  },
});
</script>

<style src="./Tooltip.scss" lang="scss"></style>
