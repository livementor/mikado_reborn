<template>
  <div class="mkr__avatar" :style="avatarStyle">
    <img v-bind="$props" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Avatar extends Vue {
  @Prop() private src!: string;

  @Prop() private alt!: string;

  @Prop() private size!: string;

  @Prop() private loading!: 'lazy' | 'eager';

  get avatarStyle(): { width: string, height: string } {
    return {
      height: `${this.size || 5}rem`,
      width: `${this.size || 5}rem`,
    };
  }
}
</script>
<style src="./Avatar.scss" lang="scss"></style>
