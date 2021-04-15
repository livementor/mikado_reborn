<template>
  <button :disabled="disabled" :class="['mkr__button', variant, size]" @click="click">
    <mkr-icon v-if="icon" :name="icon" />
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop({ default: 'primary' })
  variant!: string;

  @Prop({ default: false })
  disabled!: boolean;

  @Prop()
  icon?: string;

  @Prop({ default: 'medium', validator: (size) => ['small', 'medium', 'large'].includes(size) })
  size!: string;

  click(event: Event): void {
    this.$emit('click', event);
  }
}
</script>
<style src="./Button.scss" lang="scss"></style>
