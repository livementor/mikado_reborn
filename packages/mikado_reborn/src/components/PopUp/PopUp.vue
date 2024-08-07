<template>
  <div class="mkr__popup">
    <div ref="anchor" @click="handleButtonClick">
      <slot name="anchor" />
    </div>
    <div ref="content" :class="{ 'mkr__popup--hidden': !opened }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { createPopper, Instance as PopperInstance, Placement } from '@popperjs/core';
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        const popperInstance: PopperInstance | null = null;

        return {
            popperInstance
        };
    },
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
    },
    methods: {
        async mouted() {
            await this.updatePopperInstance(this.opened);
            this.handleEventListeners(this.opened);
        },
        async updatePopperInstance(isOpened: boolean) {
            if (isOpened) {
              await this.$nextTick();
              await this.popperInstance?.update();
            }
        },
        handleEventListeners(isOpened: boolean) {
            if (this.dismissable) {
              if (isOpened) {
                this.initCloseEventListeners();
              } else {
                this.removeCloseEventListeners();
              }
            }
        },
        initCloseEventListeners(): void {
            document.addEventListener('mousedown', this.onClickOutside);
        },
        removeCloseEventListeners(): void {
            document.removeEventListener('mousedown', this.onClickOutside);
        },
        onClickOutside(event: MouseEvent): void {
            const target = event.target as Node | null;
            if (!target) {
              return;
            }
            const isClickOutside = !this.$el.contains(event.target as Node);
            if (isClickOutside) {
              this.$emit('close', false);
            }
        },
        async handleButtonClick(): Promise<void> {
            this.$emit('close', !this.opened);
        },
        async handleOpening(isOpened: boolean): Promise<void> {
            await this.updatePopperInstance(isOpened);
            this.handleEventListeners(isOpened);
        }
    },
    props: {
        placement: { type: String, default: 'auto' },
        dismissable: { type: Boolean, default: false },
        opened: { type: Boolean }
    },
    model: {
        prop: "opened",
        event: "close"
    },
    watch: {
        "opened": [{
            handler: "handleOpening"
        }]
    }
})

</script>

<style src="./PopUp.scss" lang="scss"></style>
