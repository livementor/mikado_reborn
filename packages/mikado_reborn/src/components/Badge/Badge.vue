<template>
  <span :class="['mkr__badge', type]"><slot/></span>
</template>

<script lang=ts>
import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
export default class Badge extends Vue {
    @Prop({ default: 'warning', validator: (type) => ['danger', 'success'].includes(type) })
    type!: string
}
</script>

<style src="./Badge.scss" lang=scss></style>
