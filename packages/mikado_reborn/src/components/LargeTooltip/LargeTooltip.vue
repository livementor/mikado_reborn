<template>
  <div class="mkr__large-tooltip" ref="anchor">
    <div class="mkr__large-tooltip__anchor">
      <slot />
    </div>
    <div
      :id="`tooltip-${uuid}`"
      class="mkr__large-tooltip__container"
      ref="tooltip"
      :class="{ 'mkr__large-tooltip__label--hidden': !isOpened }"
      role="tooltip"
      :aria-hidden="!isOpened"
    >
      <div
        class="mkr__large-tooltip__label"
        :class="{ 'mkr__large-tooltip__long_text': longTextMode }"
      >
        <div v-if="htmlContent" v-html="htmlContent" />
        <template v-else-if="label">
          {{ label }}
        </template>
        <slot name="content" v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted, onBeforeUnmount, watch, nextTick, computed,
} from 'vue';
import { createPopper, Instance as PopperInstance, Placement } from '@popperjs/core';
import useUuid from '../../composables/useUuid';

export default defineComponent({
  setup(props) {
    const uuid = useUuid().generateUUID();
    const anchor = ref<HTMLElement | null>(null);
    const tooltip = ref<HTMLElement | null>(null);
    const opened = ref(false);
    const hoverTooltip = ref(false);
    const popperInstance = ref<PopperInstance | null>(null);

    const isOpened = computed(() => (opened.value || hoverTooltip.value) && !props.disabled);

    const handleOpening = async (value: boolean) => {
      if (value) {
        await nextTick();
        await popperInstance.value?.update();
      }
    };

    onMounted(() => {
      if (!anchor.value || !tooltip.value) return;

      if (props.topLevel) {
        const tooltipContainer = (window as any).$app.$refs.tooltipContainer as HTMLElement;
        if (tooltipContainer) {
          tooltipContainer.appendChild(tooltip.value);
        }
      }

      popperInstance.value = createPopper(anchor.value, tooltip.value, {
        placement: props.placement,
        modifiers: [
          { name: 'offset', options: { offset: [0, 4] } },
          { name: 'eventListeners', options: { scroll: props.addScrollListener } },
        ],
      });

      if (anchor.value.children[0]) {
        ['focus', 'mouseenter'].forEach((event) => anchor.value?.children[0].addEventListener(event, () => {
          if (!props.disabled) opened.value = true;
        }));

        ['focus', 'mouseenter'].forEach((event) => tooltip.value?.addEventListener(event, () => {
          hoverTooltip.value = true;
        }));

        ['blur', 'mouseleave'].forEach((event) => tooltip.value?.addEventListener(event, () => {
          setTimeout(() => {
            if (!opened.value) opened.value = false;
          }, 200);
          hoverTooltip.value = false;
        }));

        ['blur', 'mouseleave'].forEach((event) => anchor.value?.children[0].addEventListener(event, () => {
          setTimeout(() => {
            if (!hoverTooltip.value) hoverTooltip.value = false;
          }, 200);
          opened.value = false;
        }));

        anchor.value.children[0].setAttribute('aria-describedby', `tooltip-${uuid}`);
      }
    });

    onBeforeUnmount(() => {
      if (props.topLevel && tooltip.value) {
        tooltip.value.remove();
      }
    });

    watch(() => opened.value, handleOpening);

    return {
      uuid,
      anchor,
      tooltip,
      isOpened,
    };
  },
  props: {
    label: { type: String, default: '' },
    htmlContent: { type: String, default: '' },
    longTextMode: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    placement: { type: String as () => Placement, default: '' },
    topLevel: { type: Boolean, default: false },
    addScrollListener: { type: Boolean, default: false },
  },
});
</script>

<style src="./LargeTooltip.scss" lang="scss"></style>
