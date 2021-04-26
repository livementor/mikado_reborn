<template>
  <div :class="['mkr__snackbar', {'--error': error, '--neutral': neutral, '--success' : success}]">
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
}
</script>

<style src="./Snackbar.scss" lang=scss></style>
