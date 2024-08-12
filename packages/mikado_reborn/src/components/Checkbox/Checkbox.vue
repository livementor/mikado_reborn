<template>
  <div
    class="mkr__checkbox"
    :class="[{ 'mkr__checkbox--checked' : isChecked }, `mkr__checkbox--${size}`]"
  >
    <input
      type="checkbox"
      :value="value"
      v-model="internalValue"
    >
    <mkr-icon v-if="isChecked" name="check" />
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MkrIcon } from '../Icon';

export default defineComponent({
  components: {
    MkrIcon,
  },
  computed: {
    internalValue: {
      get() {
        return this.modelValue;
      },
      set(value: boolean | Array<string | number>) {
        this.$emit('change', value);
      },
    },
    isChecked(): boolean {
      if (Array.isArray(this.modelValue) && this.value) {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue === true;
    },
  },
  props: {
    size: {
      default: 'medium',
      validator: (size: string) => ['small', 'medium'].includes(size),
      type: String,
    },
    value: { type: [String, Number] },
    modelValue: { type: [Boolean, Array] },
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
});

</script>

<style src="./Checkbox.scss" lang="scss" />
