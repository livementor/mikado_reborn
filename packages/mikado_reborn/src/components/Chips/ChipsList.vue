<template>
  <ul
    role="listbox"
    tabindex="0"
    aria-multiselectable="false"
    :aria-orientation="orientation === 'row' ? 'horizontal' : 'vertical'"
    class="mkr__chips-list"
    :class="[
      `mkr__chips-list--${orientation}`,
      `mkr__chips-list--${size}`,
      { 'mkr__chips-list--wrap': wrap },
    ]"
    @focus="focusHandler"
    @keydown="handleKeyDown"
  >
    <slot />
  </ul>
</template>

<script lang="ts">
import {
  defineComponent, reactive, watch, provide, onMounted, onUpdated, toRefs,
} from 'vue';
import Chips from './Chips.vue';

export type ChipsListProvide = {
  value?: string | null;
  size: 'medium' | 'small';
  orientation: 'row' | 'column';
  wrap: boolean;
  emitChange: (value: string) => void;
  registerChips: (chips: typeof Chips) => void;
  unregisterChips: (uuid: string) => void;
};

export default defineComponent({
  name: 'ChipsList',
  props: {
    value: {
      type: String,
      required: true,
      validator: (value: string | null) => typeof value === 'string' || value === null,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (size: string) => ['medium', 'small'].includes(size),
    },
    orientation: {
      type: String as () => 'row' | 'column',
      default: 'row',
      validator: (orientation: string) => ['row', 'column'].includes(orientation),
    },
    wrap: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      chips: [] as typeof Chips[],
      focusedIndex: 0,
    });

    const list = reactive<ChipsListProvide>({
      value: props.value,
      size: props.size,
      orientation: props.orientation,
      wrap: props.wrap,
      emitChange: (value: string) => {
        emit('change', value);
      },
      registerChips: (chips: typeof Chips) => {
        state.chips.push(chips);
      },
      unregisterChips: (uuid: string) => {
        state.chips = state.chips.filter((chip) => chip.uuid !== uuid);
      },
    });

    provide('list', list);

    watch(
      () => props.value,
      (newValue) => {
        list.value = newValue;
      },
    );

    watch(
      () => props.size,
      (newSize) => {
        list.size = newSize;
      },
    );

    const focusHandler = () => {
      state.focusedIndex = 0;
      const firstChip = state.chips[0].$el as HTMLElement;
      firstChip.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          if (state.focusedIndex < state.chips.length - 1) {
            state.focusedIndex += 1;
            const chipToFocus = state.chips[state.focusedIndex].$el as HTMLElement;
            chipToFocus.focus();
          }
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          if (state.focusedIndex > 0) {
            state.focusedIndex -= 1;
            const chipToFocus = state.chips[state.focusedIndex].$el as HTMLElement;
            chipToFocus.focus();
          }
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (state.chips[state.focusedIndex].value === props.value) {
            list.emitChange('');
          } else {
            list.emitChange(state.chips[state.focusedIndex].value);
          }
          break;
        default:
          break;
      }
    };

    onMounted(() => {
      state.chips.sort((leftChild, rightChild) => {
        const x = Array.from((this.$el as HTMLElement).children);
        return x.indexOf(leftChild.$el) - x.indexOf(rightChild.$el);
      });
    });

    onUpdated(() => {
      state.chips.sort((leftChild, rightChild) => {
        const x = Array.from((this.$el as HTMLElement).children);
        return x.indexOf(leftChild.$el) - x.indexOf(rightChild.$el);
      });
    });

    return {
      ...toRefs(state),
      list,
      focusHandler,
      handleKeyDown,
    };
  },
});
</script>

<style src="./ChipsList.scss" lang="scss"></style>
