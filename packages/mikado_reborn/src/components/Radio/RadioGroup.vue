<template>
  <div role="radiogroup">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  reactive, provide, watch,
} from 'vue';

export type RadioGroupProvide = {
  model: string | undefined;
  name: string;
  required: boolean;
  updateValue: (value: string) => void
};

const props = withDefaults(
  defineProps<{
    name: string,
    required?: boolean,
  }>(),
  { required: false },
);

const model = defineModel<string | undefined>();

const group = reactive<RadioGroupProvide>({
  model: model.value,
  name: props.name,
  required: props.required,
  updateValue(value) {
    model.value = value;
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
