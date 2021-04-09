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

<script lang="ts">
import {
  Component, Vue, InjectReactive, Prop,
} from 'vue-property-decorator';
import { RadioGroupProvide } from './RadioGroup.vue';

@Component
export default class Radio extends Vue {
  @InjectReactive('group') readonly group?: RadioGroupProvide

  @Prop({ type: String }) label!: string

  @Prop({ type: String }) value!: string

  get name(): string {
    if (this.group) return this.group.name;
    return '';
  }

  get required(): boolean {
    if (this.group) return this.group.required;
    return false;
  }

  get checked(): boolean {
    if (this.group) return this.group.value === this.value;
    return false;
  }

  get classes(): (string | {[className: string]: boolean;})[] {
    return [
      'mkr__radio',
      {
        'mkr__radio--checked': this.checked,
      },
    ];
  }

  emitChange(): void {
    if (this.group) {
      this.group.emitChange(this.value);
    } else {
      this.$emit('change', this.value);
    }
  }
}
</script>
<style src="./Radio.scss" lang="scss"></style>
