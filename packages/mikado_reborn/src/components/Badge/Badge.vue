<template>
  <span :class="['mkr__badge', type]"><slot/></span>
</template>

<script lang=ts>
import { Component, Vue, Prop } from 'vue-property-decorator';

const badgeType = ['danger', 'success', 'warning'];

@Component({})
export default class Badge extends Vue {
    @Prop({ default: 'warning', validator: (type) => badgeType.includes(type) })
    type!: string
}
</script>

<style src="./Badge.scss" lang=scss></style>
