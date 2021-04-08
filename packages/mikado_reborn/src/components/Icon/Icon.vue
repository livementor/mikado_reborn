<template>
  <span class="mkr__icon" :class="classNames" @click="click"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Icon extends Vue {
  @Prop() private name!: string;

  @Prop() private color!: string;

  get classNames() : string[] {
    const classes = [];
    if (this.color) classes.push(this.color);
    if (this.name) classes.push(`icon-${this.name}`);
    return classes;
  }
  click(event) {
    this.$emit('click', event)
  }
}
</script>
<style src="./Icon.scss" lang="scss"></style>
