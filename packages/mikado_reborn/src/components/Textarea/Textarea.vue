<template>
  <div :class="['mkr__textarea', {'error' : error}]">
    <textarea
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :value="value"
      :rows="rows"
      @input="emitInput"
    />
  </div>
</template>

<script lang=ts>
import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
export default class Textarea extends Vue {
    @Prop({ type: String })
    value?: string;

    @Prop({ type: Number })
    minlength?: number

    @Prop({ type: Number })
    maxlength?: number

    @Prop({ type: String })
    placeholder!: string

    @Prop({ type: Boolean })
    error!: boolean;

    @Prop({ type: Number })
    rows!: number;

    emitInput(event: Event): void {
      const input = event.target as HTMLInputElement | null;
      if (input) {
        this.$emit('input', input.value);
      }
    }
}
</script>

<style src="./Textarea.scss" lang="scss"></style>
