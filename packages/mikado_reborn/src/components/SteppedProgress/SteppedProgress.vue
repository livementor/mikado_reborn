<template>
  <div class="mkr__stepped-progress">
    <div
      v-for="step in steps"
      :key="step"
      class="mkr__stepped-progress__step"
      :class="`${progress >= step ? color : backgroundColor}-bg`"/>
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
color!: string

@Prop({ type: String, default: 'neutral-20' })
backgroundColor!: string
}
</script>

<style src="./SteppedProgress.scss" lang="scss"></style>
