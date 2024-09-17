<template>
  <div
    class="mkr__checkbox"
    :class="[{ 'mkr__checkbox--checked' : isChecked }, `mkr__checkbox--${size}`]"
  >
    <input
      type="checkbox"
      :value="name"
      :checked="value"
      @change="setValue"/>

    <mkr-icon v-if="isChecked" name="check" />
  </div>

</template>

<script lang="ts" setup>
import { MkrIcon } from '../Icon';
import { computed, withDefaults, defineProps, defineEmits } from 'vue';

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium',
    name?: string | number,
    value?: boolean | Array<string | number>
  }>(),
  { size: 'small' },
);

const emit = defineEmits(['input']);

const isChecked = computed(() =>
  Array.isArray(props.value) && props.name ?
    props.value.includes(props.name) :
    props.value === true
);

const setValue = (e) => { // prepare value according to context
  let newValue: boolean | Array<string | number>;
  // if value is array && name is set => emit updated array
  // else => emit boolean
  if ( Array.isArray(props.value) && props.name ){
    newValue = props.value.includes(props.name) ?
      props.value.filter(v => v != props.name) :
      props.value.concat(props.name);
  }
  else newValue = e.target.checked;

  emit('input', newValue);
};

</script>

<style src="./Checkbox.scss" lang="scss" />
