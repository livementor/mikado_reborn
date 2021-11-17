<template>
  <span class="mkr__icon" :class="classNames" @click="click"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Icon extends Vue {
  @Prop({ required: true, type: String })
  private name!: string;

  @Prop({ default: undefined, type: String })
  private color?: string;

  get classNames() : string[] {
    const classes = [];
    if (this.color) classes.push(this.color);
    if (this.name) classes.push(`icon-${this.name}`);
    return classes;
  }

  click(event: Event): void {
    this.$emit('click', event);
  }
}
</script>
<style src="./Icon.scss" lang="scss"></style>
