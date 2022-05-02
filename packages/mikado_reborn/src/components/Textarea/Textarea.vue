<template>
  <div :class="['mkr__textarea', { error: error }]">
    <textarea
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      v-on="{
        ...$listeners,
        input: emitInputValue,
      }"
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

  emitInputValue(event: InputEvent) {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      this.$emit('input', input.value);
    }
    this.$emit('change', event);
  }
}
</script>

<style src="./Textarea.scss" lang="scss"></style>
