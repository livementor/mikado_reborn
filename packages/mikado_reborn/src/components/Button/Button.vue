<template>
  <button :disabled="disabled" :class="['mkr__button', type, size]">
    <mkr-icon v-if="icon" :name="icon" />
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop({ default: 'primary' }) type!: string;

  @Prop({ default: false }) disabled: boolean;

  @Prop() icon?: string;

  @Prop({validator: (size) => {return ['small', 'medium', 'large'].includes(size)}})
  size: string;
}
</script>
<style src="./Button.scss" lang="scss"></style>
