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
  createPopper,
  Instance as PopperInstance,
  Modifier,
  OptionsGeneric,
  Placement,
} from '@popperjs/core';

import { defineComponent } from 'vue';
import useUuid from '../../composables/useUuid';

export default defineComponent({
  data() {
    const popperInstance: PopperInstance | null = null;

    return {
      opened: false,
      popperInstance,
      uuid: useUuid().generateUUID(),
    };
  },
  computed: {
    isOpened(): boolean {
      return this.opened && !this.disabled;
    },
  },
  mounted(): void {
    const anchor = this.$refs.anchor as HTMLElement;
    const tooltip = this.$refs.tooltip as HTMLElement;

    if (this.topLevel) {
      (this.$app.$refs.tooltipContainer as HTMLElement).appendChild(tooltip);
    }
    const config: Partial<OptionsGeneric<Partial<Modifier<unknown, unknown>>>> = {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
        {
          name: 'eventListeners',
          options: {
            scroll: this.addScrollListener,
          },
        },
      ],
    };

    if (this.placement) {
      config.placement = this.placement;
    }

    this.popperInstance = createPopper(anchor, tooltip, config);

    if (!anchor.children[0]) {
      return;
    }

    ['focus', 'mouseenter'].forEach((event) => anchor.children[0].addEventListener(event, () => {
      if (!this.disabled) {
        this.opened = true;
      }
    }));
    ['blur', 'mouseleave'].forEach((event) => anchor.children[0].addEventListener(event, () => {
      this.opened = false;
    }));
    anchor.children[0].setAttribute('aria-describedby', `tooltip-${this.uuid}`);
  },
  methods: {
    beforeDestroy(): void {
      if (this.topLevel) {
        (this.$refs.tooltip as Element)?.remove();
      }
    },
    async handleOpening(isOpened: boolean): Promise<void> {
      if (isOpened) {
        await this.$nextTick();
        await this.popperInstance?.update();
      }
    },
  },
  props: {
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    placement: { type: String, default: '' },
    topLevel: { type: Boolean, default: false },
    addScrollListener: { type: Boolean, default: false },
  },
  watch: {
    opened: [{
      handler: 'handleOpening',
    }],
  },
});

</script>

<style src="./Tooltip.scss" lang="scss"></style>
