<template>
  <div role="radiogroup">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Model, Provide, Prop,
} from 'vue-property-decorator';

type OptionGroupProvide = {
  name: string,
  emitChange: (newValue: string) => void,
}

@Component
export default class OptionGroup extends Vue {
  @Model('change', { type: String }) readonly value!: string

  @Prop({ required: true, type: String }) name!: string

  @Prop({ default: false, type: Boolean }) required!: boolean

  @Provide() group: OptionGroupProvide = {
    name: this.name,
    emitChange: this.emitChange,
  }

  emitChange(newValue: string): void {
    this.$emit('input', newValue);
  }
}
</script>
