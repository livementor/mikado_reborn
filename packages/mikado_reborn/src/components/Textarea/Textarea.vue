<template>
  <div :class="['mkr__textarea', { error: error }]">
    <textarea
      v-model="inputValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      @keyup="onKeyup"
      @keydown="onKeydown"
      @click="onClick"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Textarea extends Vue {
  @Prop({ type: String })
  value?: string;

  @Prop({ type: Number })
  minlength?: number;

  @Prop({ type: Number })
  maxlength?: number;

  @Prop({ type: String })
  placeholder?: string;

  @Prop({ type: Boolean })
  error!: boolean;

  @Prop({ type: Number })
  rows!: number;

  get inputValue() {
    return this.value;
  }

  set inputValue(value: string | undefined) {
    this.$emit('input', value);
    this.$emit('change');
  }

  onChange(event: Event): void {
    this.$emit('change', event);
  }

  onFocus(event: Event) {
    this.$emit('focus', event);
  }

  onBlur(event: Event) {
    this.$emit('blur', event);
  }

  onKeydown(event: KeyboardEvent) {
    this.$emit('keydown', event);
  }

  onKeyup(event: KeyboardEvent) {
    this.$emit('keydown', event);
  }

  onClick(event: Event) {
    this.$emit('click', event);
  }
}
</script>

<style src="./Textarea.scss" lang="scss"></style>
