<template>
  <div class="mkr__avatar" :style="avatarStyle">
    <img v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  inheritAttrs: false,
})
export default class Avatar extends Vue {
  @Prop({ default: 5, type: Number }) private size!: number;

  get avatarStyle(): Partial<CSSStyleDeclaration> {
    const width = `${this.size}rem`;

    return { height: width, width };
  }
}
</script>
<style src="./Avatar.scss" lang="scss"></style>
