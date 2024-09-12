<template>
  <div class="mkr__avatar" :style="avatarStyle">
    <img v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>

import { computed } from 'vue';

const avatarStyle: Partial<CSSStyleDeclaration> = computed(() => {
  const width = `${props.size}rem`;
  return { height: width, width };
})

const props = withDefaults(defineProps<{size: number}>(), {  size: 5 });

</script>
<style src="./Avatar.scss" lang="scss"></style>
