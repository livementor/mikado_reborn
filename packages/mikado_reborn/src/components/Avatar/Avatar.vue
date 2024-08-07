<template>
  <div class="mkr__avatar" :style="avatarStyle">
    <img v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  computed: {
    avatarStyle(): Partial<CSSStyleDeclaration> {
      const width = `${this.size}rem`;

      return { height: width, width };
    },
  },
  props: {
    size: { default: 5, type: Number },
  },
});

</script>
<style src="./Avatar.scss" lang="scss"></style>
