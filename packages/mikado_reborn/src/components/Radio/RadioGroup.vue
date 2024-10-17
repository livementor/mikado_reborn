<template>
  <div role="radiogroup">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  withDefaults, reactive, provide, watch,
} from 'vue';

export type RadioGroupProvide = {
  model: string;
  name: string;
  required: boolean;
  emitInput: (value: string) => void;
};

const props = withDefaults(
  defineProps<{
    name: string,
    required?: boolean,
  }>(),
  { required: false },
);

const model = defineModel();

const emit = defineEmits(['input']);

const group = reactive<RadioGroupProvide>({
  model: model.value,
  name: props.name,
  required: props.required,
  emitInput: (value: string) => {
    emit('input', value);
  },
});

provide('group', group);

watch(
  () => model.value,
  (newValue) => {
    group.model = newValue;
  },
);

</script>
