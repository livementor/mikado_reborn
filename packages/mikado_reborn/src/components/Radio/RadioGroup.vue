<template>
  <div role="radiogroup">
    {{value}}
    <slot />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Model, ProvideReactive, Prop, Watch,
} from 'vue-property-decorator';

export type RadioGroupProvide = {
  value: string,
  name: string,
  required: boolean,
  emitChange: (value: string) => void,
}

@Component
export default class RadioGroup extends Vue {
  @Model('change', { type: String }) readonly value!: string

  @Prop({ required: true, type: String }) name!: string

  @Prop({ default: false, type: Boolean }) required!: boolean

  @ProvideReactive() group: RadioGroupProvide = {
    value: this.value,
    name: this.name,
    required: this.required,
    emitChange: this.emitChange,
  }

  @Watch('value')
  onValueChanged(): void {
    const {
      value, name, required, emitChange,
    } = this;
    this.group = {
      value, name, required, emitChange,
    };
  }

  emitChange(value: string): void {
    this.$emit('change', value);
  }
}
</script>
