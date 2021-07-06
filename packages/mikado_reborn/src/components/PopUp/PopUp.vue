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

  popperInstance: PopperInstance | null = null

  isTooltipVisible = false

  @Watch('opened')
  async handleOpening(newVal: boolean): Promise<void> {
    if (newVal) {
      await this.$nextTick();
      await this.popperInstance?.update();
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

  async handleButtonClick(): Promise<void> {
    this.$emit('close', !this.opened);
  }
}
</script>

<style src="./PopUp.scss" lang="scss"></style>
