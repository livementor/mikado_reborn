<template>
  <img class="mkr__avatar" :src="url" :alt="alt" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Avatar extends Vue {
  @Prop() private url!: string;

  @Prop() private alt!: string;
}
</script>
<style src="./Avatar.scss" lang="scss"></style>
