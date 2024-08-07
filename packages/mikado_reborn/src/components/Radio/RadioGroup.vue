<template>
  <div role="radiogroup">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, reactive, watch, provide,
} from 'vue';

export type RadioGroupProvide = {
  value: string;
  name: string;
  required: boolean;
  emitChange: (value: string) => void;
};

export default defineComponent({
  name: 'RadioGroup',
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const group = reactive<RadioGroupProvide>({
      value: props.value,
      name: props.name,
      required: props.required,
      emitChange: (value: string) => {
        emit('change', value);
      },
    });

    provide('group', group);

    watch(
      () => props.value,
      (newValue) => {
        group.value = newValue;
      },
    );

    return {
      group,
    };
  },
});
</script>
