<template>
  <button :class="classNames"><slot /></button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() private color!: string;

  @Prop({ default: false })
  disabled: boolean;

  @Prop()
  icon?: string;

  @Prop({ validator: (size) => ['small', 'medium', 'large'].includes(size) })
  size: string;

  click(event: Event): void {
    this.$emit('click', event);
  }
}
</script>
<style src="./Button.scss" lang="scss"></style>
