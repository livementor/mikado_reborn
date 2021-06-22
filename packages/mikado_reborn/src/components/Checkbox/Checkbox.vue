<template>
  <div
    class="mkr__checkbox"
    role="checkbox"
    :class="[{ 'mkr__checkbox--checked' : checked }, `mkr__checkbox--${size}`]"
    tabindex="0"
    :aria-checked="checked"
    @click="onToggle"
    @keyup.space="onToggle"
  >
    <mkr-icon name="check" v-if="checked" />
  </div>

</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
import { MkrIcon } from '../Icon';

@Component({
  components: {
    MkrIcon,
  },
})
export default class Checkbox extends Vue {
  @Model('change', { type: Boolean }) readonly checked!: boolean

  @Prop({ default: 'medium', validator: (size) => ['small', 'medium'].includes(size) })
  size!: string;

  onToggle(): void {
    this.$emit('change', !this.checked);
  }
}
</script>

<style src="./Checkbox.scss" lang="scss" />
