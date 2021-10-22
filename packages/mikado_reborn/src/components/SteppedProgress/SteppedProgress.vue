<template>
  <div>
    <div class="mkr_steppedprogress">
      <div
        v-for="step in steps"
        :key="step"
        class="mkr_steppedprogress_step"
        :class="progress >= step ? passedColor: defaultBackgroundColor"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SteppedProgress extends Vue {
@Prop({ type: Number })
steps!: number

@Prop({ type: Number, default: 0 })
progress!: number

@Prop({ type: String, default: 'primary' })
private color!: string

@Prop({ type: String, default: 'neutral-20' })
private backgroundColor!: string

get defaultBackgroundColor() : string {
  return `${this.backgroundColor}-bg`;
}

get passedColor() : string {
  if (this.color) { return `${this.color}-bg`; }

  return '';
}
}
</script>

<style src="./SteppedProgress.scss" lang="scss"></style>
