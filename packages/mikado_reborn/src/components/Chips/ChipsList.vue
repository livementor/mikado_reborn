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
  provide, reactive, ref, watch
} from 'vue'

export type ChipsListProvide = {
  size: 'medium' | 'small';
  orientation: 'row' | 'column';
  wrap: boolean;
  model: string
  updateValue: (value: string) => void
};

const model = defineModel();

const props = withDefaults(
  defineProps<{
    size?: 'medium' | 'small',
    orientation?: 'row' | 'column',
    wrap?: boolean,
  }>(),
  {
    size: 'small',
    orientation: 'row',
    wrap: false,
  },
);

const listRef = ref<HTMLElement | null>(null);

const list = reactive({
  model: model.value,
  size: props.size,
  orientation: props.orientation,
  wrap: props.wrap,
  updateValue: (value: string) => {
    model.value = value;
  },
});

provide('list', list);
watch(() => props.size, () => {
  list.size = props.size
})

watch(() => model.value, (value) => {
  list.model = value;
});

</script>

<style src="./ChipsList.scss" lang="scss"></style>
