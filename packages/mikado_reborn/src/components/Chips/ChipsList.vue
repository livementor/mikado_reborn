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
  provide, reactive, ref, watch, defineProps, withDefaults, defineEmits,
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

const props = withDefaults(
  defineProps<{
    value?: string,
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

// const chips = ref<typeof Chips[]>([]); // TODO: confirm useless line
const listRef = ref<HTMLElement | null>(null);

const list = reactive({
  value: props.value,
  size: props.size,
  orientation: props.orientation,
  wrap: props.wrap,
  emitChange: (value: string) => {
    emit('input', value);
  },
});

provide('list', list);

watch(() => props.value, (value) => {
  list.value = value;
});

</script>

<style src="./ChipsList.scss" lang="scss"></style>
