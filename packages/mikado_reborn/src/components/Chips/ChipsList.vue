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
import { provide, reactive, ref, watch, defineProps, withDefaults, defineEmits } from 'vue';
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
    value: string | null,
    size?: 'medium' | 'small',
    orientation?: 'row' | 'column',
    wrap?: boolean,
  }>(),
  {
    size: 'medium',
    orientation: 'row',
    wrap: false,
  }
);

const emits = defineEmits(['input']);

const chips = ref<typeof Chips[]>([]);
const listRef = ref<HTMLElement | null>(null);

const list = reactive({
  value: props.value,
  size: props.size,
  orientation: props.orientation,
  wrap: props.wrap,
  emitChange: (value: string) => {
    emits('input', value);
  },
});

provide('list', list);

watch(() => props.value, (value: string) => {
  list.value = value;
});

/*import {
  defineComponent, provide, reactive, ref, watch,
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
    const chips = ref<typeof Chips[]>([]);
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

    watch(() => props.value, (value: string) => {
      list.value = value;
    });

    return {
      chips,
      listRef,
    };
  },
});*/
</script>

<style src="./ChipsList.scss" lang="scss"></style>
