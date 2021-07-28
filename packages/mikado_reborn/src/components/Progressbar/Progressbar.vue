<template>
  <div
    class="mkr__progressbar"
    role="progressbar"
    aria-valuemin="0"
    :aria-valuemax="total"
    :aria-valuenow="current"
  >
    <div :class="['mkr__progressbar__emoji', { 'mkr__progressbar__emoji-visible': isCompleted }]">
      <slot> 👍 </slot>
    </div>
    <div class="mkr__progressbar__text">{{ current }}/{{ total }}</div>

    <div class="mkr__progressbar__bar">
      <span :style="spanStyle" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Progressbar extends Vue {
  @Prop({ type: Number, default: 0 })
  current!: number;

  @Prop({ type: Number, required: true })
  total!: number;

  get isCompleted(): boolean {
    return this.current >= this.total;
  }

  get spanStyle(): Partial<CSSStyleDeclaration> {
    const percentage = Math.max(Math.min((this.current / this.total) * 100, 100), 0);
    return {
      transform: this.current <= 0 ? 'translateX(-4px)' : '', // hide border-width
      width: `${percentage}%`,
    };
  }
}
</script>

<style src="./Progressbar.scss" lang="scss"></style>
