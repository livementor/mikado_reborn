<template>
  <Transition
    appear
    :name="transition"
    @after-enter="onBackdropAnimationEnter"
    @after-leave="onBackdropAnimationLeave"
  >
    <div
      v-show="present"
      :class="['mkr__backdrop', { 'mkr__backdrop--present': present }, backdropClass]"
      tabindex="-1"
      role="dialog"
    >
      <div class="n-backdrop__overlay" tabindex="-1" @click.self="onBackdropClicked"></div>
      <div class="n-backdrop__content" v-bind="$attrs" role="document" tabindex="0">
        <slot :closeModal="() => closeModal()"></slot>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
/* eslint-disable vue/no-boolean-default */
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';

const MODAL_OPENED_CLASS = '--mkr-backdrop-present';

const addClassToDocument = () => document.documentElement.classList.add(MODAL_OPENED_CLASS);
const removeClassFromDocument = () => document.documentElement.classList.remove(MODAL_OPENED_CLASS);

@Component({
  inheritAttrs: false,
})
export default class BackDrop extends Vue {
  @Prop({ type: Boolean, default: false })
  value!: boolean

  @Prop({ type: Boolean, default: false })
  noClickOnBackdrop!: boolean

  @Prop({ type: [Array, String, Object], default: Array })
  backdropClass!: string[] | string | Record<string, string>

  @Prop({ type: String, default: 'backdrop-anim' })
  transition!: string

  @Prop({ type: String, default: false })
  noEscapeKey!: string

  @Prop({ type: Number, default: 20 })
  zOffset!: number

  @Prop({ type: Number, default: 1050 })
  defaultZIndex!: number

  present = false

  toggleBackdrop = (show: boolean) => { this.present = show; }

  created() {
    this.present = this.value;
  }

  openModal = () => this.toggleBackdrop(true)

  closeModal = () => this.toggleBackdrop(false)

  onBackdropAnimationEnter = () => this.$emit('open')

  onBackdropAnimationLeave = () => {
    this.$emit('input', false);
    this.$emit('close');
  };

  onBackdropClicked = () => {
    if (!this.noClickOnBackdrop) {
      this.toggleModal(false);
    }
  }

  onKeyPress = (event: KeyboardEvent) => {
    if (!this.noEscapeKey && event.key === 'Escape') {
      this.toggleModal(false);
    }
  };

  toggleModal = (show: boolean) => {
    if (show) {
      this.openModal();
    } else {
      this.closeModal();
    }
  };

  @Watch('value', { immediate: true })
  onValueChanged = (value: boolean) => {
    this.present = value;
    if (value) {
      addClassToDocument();
      window.addEventListener('keyup', this.onKeyPress, false);
    } else {
      window.removeEventListener('keyup', this.onKeyPress);
      removeClassFromDocument();
    }
  }
}
</script>

<style src="./BackDrop.scss" lang="scss"></style>
