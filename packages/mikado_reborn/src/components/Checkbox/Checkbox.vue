<template>
  <div
    class="mkr__checkbox"
    role="checkbox"
    :class="[{ 'mkr__checkbox--checked' : isChecked }, `mkr__checkbox--${size}`]"
    tabindex="0"
    :aria-checked="isChecked"
    @keyup.space="onChange"
  >
    <input type="checkbox" :checked="isChecked" :value="value" @change="onChange" tabindex="-1">
    <mkr-icon v-if="isChecked" name="check" />
  </div>

</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
import { MkrIcon } from '../Icon';

@Component({
  components: {
    MkrIcon,
  },
})
export default class Checkbox extends Vue {
  @Model('change', { type: [Boolean, Array] }) readonly modelValue!: boolean | string[] | number[]

  @Prop({ default: 'medium', validator: (size) => ['small', 'medium'].includes(size) })
  size!: string;

  @Prop({ type: [String, Number] })
  value?: string | number;

  get isChecked() {
    if (Array.isArray(this.modelValue)) {
      return this.modelValue.includes(this.value);
    }
    return this.modelValue === true;
  }

  onChange(event): void {
    const isChecked = !this.isChecked;

    if (!Array.isArray(this.modelValue)) {
      return this.$emit('change', isChecked);
    }

    const newValue = [...this.modelValue];
    if (isChecked) {
      newValue.push(this.value);
    } else {
      newValue.splice(newValue.indexOf(this.value), 1);
    }
    return this.$emit('change', newValue);
  }
}
</script>

<style src="./Checkbox.scss" lang="scss" />
