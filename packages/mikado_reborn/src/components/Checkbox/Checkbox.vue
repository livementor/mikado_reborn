<template>
  <div
    class="mkr__checkbox"
    role="checkbox"
    :class="[{ 'checked' : value }, size]"
    tabindex="0"
    :aria-checked="value"
    @click="onToggle"
    @keyup.space="onToggle"
  >
    <mkr-icon name="check" v-if="value" />
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MkrIcon } from '../Icon';

@Component({
  components: {
    MkrIcon,
  },
})
export default class Checkbox extends Vue {
  @Prop({ required: true, type: Boolean })
  value!: boolean

  @Prop({ default: 'medium', validator: (size) => ['small', 'medium'].includes(size) })
  size!: string;

  onToggle(): void {
    this.$emit('input', !this.value);
  }
}
</script>

<style src="./Checkbox.scss" lang="scss" />
