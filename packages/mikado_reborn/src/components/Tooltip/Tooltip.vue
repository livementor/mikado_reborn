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
  Component, Prop, Mixins, Watch,
} from 'vue-property-decorator';
import {
  createPopper,
  Instance as PopperInstance,
  Modifier,
  OptionsGeneric,
  Placement,
} from '@popperjs/core';

import Uuid from '../../mixins/uuid';

@Component
export default class Tooltip extends Mixins(Uuid) {
  @Prop({ type: String, default: '' })
  readonly label!: string;

  @Prop({ type: Boolean, default: false })
  readonly disabled!: boolean;

  @Prop({ type: String, default: '' })
  readonly placement!: Placement;

  @Prop({ type: Boolean, default: false })
  readonly topLevel!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly addScrollListener!: boolean;

  opened = false;

  popperInstance: PopperInstance | null = null;

  get isOpened(): boolean {
    return this.opened && !this.disabled;
  }

  @Watch('opened')
  async handleOpening(isOpened: boolean): Promise<void> {
    if (isOpened) {
      await this.$nextTick();
      await this.popperInstance?.update();
    }
  }

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
  }

  beforeDestroy(): void {
    if (this.topLevel) {
      (this.$refs.tooltip as Element)?.remove();
    }
  }
}
</script>

<style src="./Tooltip.scss" lang="scss"></style>
