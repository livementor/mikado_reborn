<template>
  <div :class="classes">
    <label>
      <input
        :value="value"
        :name="name"
        type="radio"
        :checked="checked"
        :required="required"
        @change="emitChange"
      >
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, defineProps } from 'vue';
import { RadioGroupProvide } from './RadioGroup.vue';

const props = defineProps<{ label: string, value: string }>();

const group = inject<RadioGroupProvide>('group', {
  value: '',
  name: '',
  required: false,
  emitChange: () => {},
});

const name = computed(() => (group ? group.name : ''));
const required = computed(() => (group ? group.required : false));
const checked = computed(() => (group ? group.value === props.value : false));
const classes = computed(() => [
  'mkr__radio',
  {
    'mkr__radio--checked': checked.value,
  },
]);

const emitChange = () => {
  if (group) {
    group.emitChange(props.value);
  } else {
    emit('change', props.value);
  }
};

</script>

<style src="./Radio.scss" lang="scss"></style>
