<template>
  <div>
    <span
      class="mkr__toggle"
      :class="{ 'mkr__toggle--active': value }"
      role="checkbox"
      :aria-checked="value.toString()"
      tabindex="0"
      @click="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="mkr__toggle-indicator" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';

@Component({})
export default class Toggle extends Vue {
  @Model('change', { type: Boolean }) readonly value!: boolean;

  toggle(): void {
    this.$emit('change', !this.value);
  }
}
</script>

<style src="./Toggle.scss" lang="scss"></style>
