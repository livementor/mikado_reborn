<template>
  <div>
    <span
      class="mkr__switch"
      :class="{ 'mkr__switch--active': value }"
      role="checkbox"
      :aria-checked="value"
      tabindex="0"
      @click="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="mkr__switch__indicator" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';

@Component({})
export default class Switch extends Vue {
  @Model('change', { type: Boolean }) readonly value!: boolean;

  toggle(): void {
    this.$emit('change', !this.value);
  }
}
</script>

<style src="./Switch.scss" lang="scss"></style>
