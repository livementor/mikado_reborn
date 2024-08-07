<template>
  <div class="mkr__stepped-progress">
    <div
      v-for="step in steps"
      :key="step"
      class="mkr__stepped-progress__step"
      :class="`${progress >= step ? color : backgroundColor}-bg`"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        steps: { type: Number },
        progress: { type: Number, default: 0 },
        color: { type: String, default: 'primary' },
        backgroundColor: { type: String, default: 'neutral-20' }
    }
})

</script>

<style src="./SteppedProgress.scss" lang="scss"></style>
