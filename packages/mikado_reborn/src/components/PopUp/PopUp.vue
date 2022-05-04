<template>
  <div class="mkr__popup">
    <div ref="anchor" @click="handleButtonClick">
      <slot name="anchor"/>
    </div>
    <div ref="content" :class="{'mkr__popup--hidden': !opened}">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Model, Watch,
} from 'vue-property-decorator';
import {
  createPopper, Instance as PopperInstance, Placement,
} from '@popperjs/core';

@Component
export default class PopUp extends Vue {
  @Model('close', { type: Boolean }) readonly opened!: boolean

  @Prop({ type: String, default: 'auto' })
  placement!: Placement

  @Prop({ type: Boolean, default: false })
  readonly dismissable!: boolean;

  popperInstance: PopperInstance | null = null

  @Watch('opened', { immediate: true })
  async handleOpening(isOpened: boolean): Promise<void> {
    if (isOpened) {
      await this.$nextTick();
      await this.popperInstance?.update();
    }

    if (this.dismissable) {
      if (isOpened) {
        this.initCloseEventListeners();
      } else {
        this.removeCloseEventListeners();
      }
    }
  }

  mounted(): void {
    const anchor = this.$refs.anchor as HTMLElement;
    const content = this.$refs.content as HTMLElement;

    this.popperInstance = createPopper(anchor.children[0], content.children[0] as HTMLElement, {
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
  }

  initCloseEventListeners(): void {
    document.addEventListener('mousedown', this.onClickOutside);
  }

  removeCloseEventListeners(): void {
    document.removeEventListener('mousedown', this.onClickOutside);
  }

  onClickOutside(event: MouseEvent): void {
    const target = event.target as Node | null;
    if (!target) {
      return;
    }
    const isClickOutside = !(this.$el.contains(event.target as Node));
    if (isClickOutside) {
      this.$emit('close', false);
    }
  }

  async handleButtonClick(): Promise<void> {
    this.$emit('close', !this.opened);
  }
}
</script>

<style src="./PopUp.scss" lang="scss"></style>
