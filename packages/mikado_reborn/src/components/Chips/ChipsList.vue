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
    ref="listRef"
  >
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import {
  provide, reactive, ref, watch, withDefaults,
} from 'vue';
import Chips from './Chips.vue';

export type ChipsListProvide = {
  size: 'medium' | 'small';
  orientation: 'row' | 'column';
  wrap: boolean;
  emitInput: (value: string) => void;
  registerChips: (chips: typeof Chips) => void;
  unregisterChips: (uuid: string) => void;
};

const model = defineModel();

const props = withDefaults(
  defineProps<{
    size?: 'medium' | 'small',
    orientation?: 'row' | 'column',
    wrap?: boolean,
  }>(),
  {
    size: 'medium',
    orientation: 'row',
    wrap: false,
  },
);

const emit = defineEmits(['input']);

const listRef = ref<HTMLElement | null>(null);

const list = reactive({
  model: model.value,
  size: props.size,
  orientation: props.orientation,
  wrap: props.wrap,
  emitInput: (value: string) => {
    emit('input', value);
  },
});

provide('list', list);

watch(() => model.value, (value) => {
  list.model = value;
});

</script>

<style src="./ChipsList.scss" lang="scss"></style>
