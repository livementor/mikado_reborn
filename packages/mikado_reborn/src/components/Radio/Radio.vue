<template>
  <div :class="classes">
    <label>
      <input
        :value="value"
        :name="name"
        type="radio"
        :checked="checked"
        :required="required"
        @input="emitInput"
      >
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import {
  inject, computed,
} from 'vue';
import { RadioGroupProvide } from './RadioGroup.vue';

const props = defineProps<{ label: string, value: string }>();

const group = inject<RadioGroupProvide>('group');

const name = computed(() => (group ? group.name : ''));
const required = computed(() => (group ? group.required : false));
const checked = computed(() => (group ? group.model === props.value : false));
const classes = computed(() => [
  'mkr__radio',
  {
    'mkr__radio--checked': checked.value,
  },
]);

const emitInput = () => {
  if (group) {
    if (checked.value) {
      group.updateValue('');
    } else {
      group.updateValue(props.value);
    }
  }
};

</script>

<style src="./Radio.scss" lang="scss"></style>
