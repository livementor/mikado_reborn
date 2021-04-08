<template>
  <div>Option {{ name }}</div>
</template>

<script lang="ts">
import {
  Component, Vue, Inject, Prop,
} from 'vue-property-decorator';
import OptionGroupProvide from './OptionGroup.vue';

@Component
export default class Option extends Vue {
  @Inject('group') readonly group?: OptionGroupProvide

  @Prop({ type: String }) label!: string

  get name(): string {
    if (this.group) return this.group.name;
    return '';
  }
}
</script>
<style src="./Option.scss" lang="scss"></style>
