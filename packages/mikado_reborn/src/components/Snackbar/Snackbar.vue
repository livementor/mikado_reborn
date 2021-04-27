<template>
  <div
      :class="[
        'mkr__snackbar',
        show ? 'visible' : 'hidden',
        {
          '--error': error,
          '--neutral': neutral,
          '--success' : success,
          'hasClose': hasClose,
        }]"
        @click="click">
    <span>{{ message }}</span>
    <mkr-icon v-if="hasClose" name="cross" />
  </div>
</template>

<script lang=ts>
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component
export default class Snackbar extends Vue {
  @Prop({ type: String, required: true })
  message!: string

  @Prop({ type: Boolean })
  error?: boolean

  @Prop({ type: Boolean })
  success?: boolean

  @Prop({ type: Boolean })
  neutral?: boolean

  @Prop({ type: Boolean, default: false })
  hasClose?: boolean

  @Prop({ type: Boolean, default: false })
  show!: boolean

  @Prop({ type: Number, default: 5000 })
  timeout!: number

  click(event: Event): void {
    if (this.hasClose) {
      this.show = false;
      this.$emit('click', event);
    }
  }

  @Watch('show')
  onChange(val: boolean): void {
    if (val && this.timeout > 0) {
      setTimeout(() => {
        this.show = false;
      }, this.timeout);
    }
  }
}
</script>

<style src="./Snackbar.scss" lang=scss></style>
