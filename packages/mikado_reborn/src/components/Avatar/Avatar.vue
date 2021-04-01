<template>
  <div class="mkr__avatar">
    <img v-bind="$props" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Avatar extends Vue {
  @Prop() private src!: string;

  @Prop() private alt!: string;

  @Prop() private loading!: 'lazy' | 'eager';
}
</script>
<style src="./Avatar.scss" lang="scss"></style>
