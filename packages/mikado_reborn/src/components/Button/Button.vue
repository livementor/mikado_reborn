<template>
    <button :class="classNames"><slot /></button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() private color!: string;

  get classNames() : string[] {
    const classes = [];
    if (this.color) classes.push(`${this.color}-bg`);
    return classes;
  }
}
</script>
<style src="./Button.scss" lang="scss"></style>
