<template>
  <div class="mkr__stepped-progress">
    <div
      v-for="step in steps"
      :key="step"
      class="mkr__stepped-progress__step"
      :class="`${progress >= step ? color : backgroundColor}-bg`"/>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue';

withDefaults(
  defineProps<{
    steps?: number,
    progress?: number,
    color?: string,
    backgroundColor?: string,
  }>(),
  {
    progress: 0,
    color: 'primary',
    backgroundColor: 'neutral-20',
  },
);

</script>

<style src="./SteppedProgress.scss" lang="scss"></style>
