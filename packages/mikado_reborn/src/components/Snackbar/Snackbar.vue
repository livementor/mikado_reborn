<template>
  <div
      :class="[
        'mkr__snackbar',
        show ? 'mkr__snackbar--show' : 'mkr__snackbar--hidden',
        {
          'mkr__snackbar--error': error,
          'mkr__snackbar--neutral': neutral,
          'mkr__snackbar--success' : success,
          'mkr__snackbar--closable': closable,
        }]"
        @click="click">
    <span>{{ message }}</span>
    <mkr-icon v-if="closable" name="cross" />
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
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
  closable!: boolean

  @Prop({ type: Number, default: 5000 })
  timeout!: number

  show = true

  click(event: Event): void {
    if (this.closable) {
      this.close(event);
    }
  }

  close(event?: Event): void {
    this.show = false;
    this.$emit('close', event);
  }

  mounted(): void {
    if (this.timeout > 0) {
      setTimeout(() => {
        if (this.show) {
          this.close();
        }
      }, this.timeout);
    }
  }
}
</script>

<style src="./Snackbar.scss" lang="scss"></style>
