<template>
  <div
    class="mkr__checkbox"
    :class="[{ 'mkr__checkbox--checked' : isChecked }, `mkr__checkbox--${size}`]"
  >
    <input
      type="checkbox"
      :value="model"
      :checked="isChecked"
      @input="setValue"
    />

    <mkr-icon v-if="isChecked" name="check" />
  </div>

</template>

<script lang="ts" setup>
import {
  computed, withDefaults,
} from 'vue';
import { MkrIcon } from '../Icon';

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium',
    name?: string | number,
  }>(),
  { size: 'small' },
);

const model = defineModel<boolean | Array<string | number>>();

const isChecked = computed(() => (Array.isArray(model.value) && props.name
  ? model.value.includes(props.name)
  : model.value === true));

const setValue = (e) => { // prepare value according to context
  let newValue: boolean | Array<string | number>;
  // if value is array && name is set => emit updated array
  // else => emit boolean
  if (Array.isArray(model.value) && props.name) {
    newValue = model.value.includes(props.name)
      ? model.value.filter((v) => v !== props.name)
      : model.value.concat(props.name);
  } else {
    newValue = e.target.checked;
  }

  model.value = newValue;
};

</script>

<style src="./Checkbox.scss" lang="scss" />
