<template>
  <input class="mkr__slider" ref="slider" v-model="progressValue" type="range" min="0" max="100" @change="valueChange">
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Slider extends Vue {

  @Prop({ type: Number, default: 0 })
  value!: number

  get sliderStyle(): any {
    const slider = this.$refs.slider as HTMLElement
    const sliderComputedStyle = getComputedStyle(slider)
    const trackColor = sliderComputedStyle.getPropertyValue('--track-color')
    const progressColor = sliderComputedStyle.getPropertyValue('--progress-color')
    return { slider, trackColor, progressColor }
  }

  get progressValue(): Number {
    return this.value
  }

  set progressValue(val: Number) {
    const {slider, trackColor, progressColor} = this.sliderStyle
    slider.style.background = `linear-gradient(to right, ${trackColor} 0%, ${trackColor}  ${val}%, ${progressColor} ${val}%, ${progressColor} 100%)`
    this.$emit('input', +(val))
  }

  mounted () {
    this.progressValue = this.value
  }

  valueChange (event) {
    this.progressValue = event.target.value
  }
}
</script>

<style src="./Slider.scss" lang="scss"></style>
