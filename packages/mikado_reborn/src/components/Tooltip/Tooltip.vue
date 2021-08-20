<template>
  <div class="mkr__tooltip">
    <div class="mkr__tooltip__anchor" ref="anchor">
      <slot />
    </div>
    <div
      :id="`tooltip-${uuid}`"
      class="mkr__tooltip__label"
      ref="tooltip"
      :class="{ 'mkr__tooltip__label--hidden': !opened }"
      role="tooltip"
      :aria-hidden="!opened"
    >
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Mixins, Watch,
} from 'vue-property-decorator';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';

import Uuid from '../../mixins/uuid';

@Component
export default class PopUp extends Mixins(Uuid) {
  @Prop({ type: String, default: '' })
  readonly label!: string;

  @Prop({ type: Boolean, default: false })
  readonly disabled!: boolean;

  opened = false;

  popperInstance: PopperInstance | null = null;

  @Watch('opened')
  async handleOpening(isOpened: boolean): Promise<void> {
    if (isOpened) {
      await this.$nextTick();
      await this.popperInstance?.update();
    }
  }

  @Watch('disabled')
  async handleDisabled(isDisabled: boolean): Promise<void> {
    if (isDisabled && this.opened) {
      this.opened = false;
    }
  }

  mounted(): void {
    const anchor = this.$refs.anchor as HTMLElement;
    const tooltip = this.$refs.tooltip as HTMLElement;

    this.popperInstance = createPopper(anchor, tooltip, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
    });

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
  }
}
</script>

<style src="./Tooltip.scss" lang="scss"></style>
