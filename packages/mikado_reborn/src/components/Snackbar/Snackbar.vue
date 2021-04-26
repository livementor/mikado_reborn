<template>
  <div :class="['mkr__snackbar', {'--error': error, '--neutral': neutral, '--success' : success, 'hasClose': hasClose}]"  @click="click">
    <span>{{ message }}</span>
    <mkr-icon v-if="hasClose" name="cross" />
  </div>
</template>

<script lang=ts>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Snackbar extends Vue {

  @Prop({type: String, required: true})
  message!: string

  @Prop({type: Boolean})
  error?: boolean

  @Prop({type: Boolean})
  success?: boolean

  @Prop({type: Boolean})
  neutral?: boolean

  @Prop({type: Boolean, default: false})
  hasClose?: boolean

  click(event: Event): void {
    if (this.hasClose) {
      this.$emit('click', event);
    }
  }
}
</script>

<style src="./Snackbar.scss" lang=scss></style>
