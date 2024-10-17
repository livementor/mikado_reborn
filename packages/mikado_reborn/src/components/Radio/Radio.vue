<template>
  <div :class="classes">
    <label>
      <input
        :value="model"
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

defineProps<{ label: string }>();
const emit = defineEmits(['change']);
const model = defineModel();

const group = inject<RadioGroupProvide>('group', {
  model: '',
  name: '',
  required: false,
  emitInput: () => {},
});

const name = computed(() => (group ? group.name : ''));
const required = computed(() => (group ? group.required : false));
const checked = computed(() => (group ? group.model === model.value : false));
const classes = computed(() => [
  'mkr__radio',
  {
    'mkr__radio--checked': checked.value,
  },
]);

const emitInput = () => {
  if (group) {
    group.emitInput(model.value);
  } else {
    emit('change', model.value);
  }
};

</script>

<style src="./Radio.scss" lang="scss"></style>
