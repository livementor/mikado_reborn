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
import {
  Component, Model, Prop, Vue,
} from 'vue-property-decorator';
import { MkrIcon } from '../Icon';

@Component({
  components: {
    MkrIcon,
  },
})
export default class Checkbox extends Vue {
  @Model('change', { type: [Boolean, Array] }) readonly modelValue!: boolean | (string|number)[]

  @Prop({ default: 'medium', validator: (size: 'small' | 'medium') => ['small', 'medium'].includes(size) })
  size!: string;

  @Prop({ type: [String, Number] })
  value?: string | number;

  get internalValue(): boolean | (string|number)[] {
    return this.modelValue;
  }

  set internalValue(value: boolean | (string|number)[]) {
    this.$emit('change', value);
  }

  get isChecked(): boolean {
    if (Array.isArray(this.modelValue) && this.value) {
      return this.modelValue.includes(this.value);
    }
    return this.modelValue === true;
  }
}
</script>

<style src="./Checkbox.scss" lang="scss" />
