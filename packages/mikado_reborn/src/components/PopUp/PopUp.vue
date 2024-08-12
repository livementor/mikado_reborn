<template>
  <div class="mkr__popup">
    <div ref="anchor" @click="handleButtonClick">
      <slot name="anchor" />
    </div>
    <div ref="content" :class="{ 'mkr__popup--hidden': !value }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { createPopper, Instance as PopperInstance, Placement } from '@popperjs/core';
import {
  defineComponent, ref, watch, onMounted, nextTick,
} from 'vue';

export default defineComponent({
  props: {
    placement: { type: String as () => Placement, default: 'auto' },
    dismissable: { type: Boolean, default: false },
    value: { type: Boolean },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const popperInstance = ref<PopperInstance | null>(null);
    const anchor = ref<HTMLElement | null>(null);
    const content = ref<HTMLElement | null>(null);

    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }
      const isClickInModal = anchor.value?.contains(target) || content.value?.contains(target);
      if (!isClickInModal) {
        emit('input', false);
      }
    };

    const initCloseEventListeners = () => {
      document.addEventListener('mousedown', onClickOutside);
    };

    const removeCloseEventListeners = () => {
      document.removeEventListener('mousedown', onClickOutside);
    };

    const updatePopperInstance = async (isOpened: boolean) => {
      if (isOpened) {
        await nextTick();
        await popperInstance.value?.update();
      }
    };

    const handleEventListeners = (isOpened: boolean) => {
      if (props.dismissable) {
        if (isOpened) {
          initCloseEventListeners();
        } else {
          removeCloseEventListeners();
        }
      }
    };

    const handleButtonClick = async () => {
      emit('input', !props.value);
    };

    const handleOpening = async (isOpened: boolean) => {
      await updatePopperInstance(isOpened);
      handleEventListeners(isOpened);
    };

    onMounted(() => {
      if (anchor.value && content.value) {
        const anchorChild = anchor.value.children[0] as HTMLElement;
        const contentChild = content.value.children[0] as HTMLElement;

        popperInstance.value = createPopper(anchorChild, contentChild, {
          placement: props.placement || 'bottom',
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
    });

    watch(() => props.value, (newVal) => {
      handleOpening(newVal);
    });

    return {
      anchor,
      content,
      handleButtonClick,
      updatePopperInstance,
      handleEventListeners,
      initCloseEventListeners,
      removeCloseEventListeners,
      onClickOutside,
    };
  },
});
</script>

<style src="./PopUp.scss" lang="scss"></style>
