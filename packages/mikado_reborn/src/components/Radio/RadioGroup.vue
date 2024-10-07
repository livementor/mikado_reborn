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
  value: string;
  name: string;
  required: boolean;
  emitChange: (value: string) => void;
};

const props = withDefaults(
  defineProps<{
    value: string,
    name: string,
    required?: boolean,
  }>(),
  { required: false },
);

const emit = defineEmits(['input']);

const group = reactive<RadioGroupProvide>({
  value: props.value,
  name: props.name,
  required: props.required,
  emitChange: (value: string) => {
    emit('input', value);
  },
});

provide('group', group);

watch(
  () => props.value,
  (newValue) => {
    group.value = newValue;
  },
);

</script>
