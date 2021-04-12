<template>
  <div :class="['mkr__card', { 'bordered': bordered }]">
    <slot />
  </div>
</template>

<script lang=ts>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop({ type: Boolean, default: false })
  bordered: boolean
}
</script>

<style src="./Card.scss" lang=scss></style>
