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
  size: 'medium' | 'small' | 'square';
  orientation: 'row' | 'column';
  wrap: boolean;
  model: string | string[]
  multiple: boolean,
  updateValue: (value: string) => void
};

const model = defineModel<string | string[]>();

const emit = defineEmits<{
  change: [value: string | string[]],
  update: [value: string | string[]]
}>();

const props = withDefaults(
  defineProps<{
    size?: 'medium' | 'small' | 'square',
    orientation?: 'row' | 'column',
    wrap?: boolean,
    multiple?: boolean,
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
  multiple: props.multiple,
  updateValue: (value: string) => {
    if(props.multiple) {
      if(model.value?.indexOf(value) === -1) {
        model.value = [...(model.value || []), value]
      }
      else {
        model.value = (model.value as string[] || []).filter((v: string) => v !== value)
      }
    }
    else {
      model.value = model.value === value ? '' : value;
    }
  },
});

provide('list', list);
watch(() => props.size, () => {
  list.size = props.size
})
watch(() => props.multiple, () => {
  list.multiple = props.multiple
  list.model = props.multiple ? [] : ''
  model.value = list.model
})

watch(() => model.value, (value) => {
  list.model = value;
  emit('change', value as string | string[]);
  emit('update', value as string | string[]);
});

</script>

<style src="./ChipsList.scss" lang="scss"></style>
