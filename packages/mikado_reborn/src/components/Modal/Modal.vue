<template>
  <mkr-card
    class="mkr__modal"
    :class="[
      `mkr__modal--${size}`,
      {
        'mkr__modal--opened': opened,
      }
    ]">
    <slot />
  </mkr-card>
</template>

<script lang="ts">
import {
  Component,
  Model,
  Mixins,
  Prop,
} from 'vue-property-decorator';
import Uuid from '../../mixins/uuid';
import { MkrCard } from '../Card';

export const sizes = {
  medium: 'medium',
  small: 'small',
};

@Component({
  components: {
    MkrCard,
  },
})
export default class Modal extends Mixins(Uuid) {
  @Model('close', { type: Boolean }) readonly opened!: boolean

  @Prop({
    type: String,
    validator: (value: string): boolean => Object.values(sizes).includes(value),
    default: 'medium',
  })
  readonly size!: (keyof typeof sizes);

  mounted(): void {
    const app = this.$app;
    app.$el.insertBefore(this.$el, app.$el.children[0]);
  }
}
</script>

<style src="./Modal.scss" lang="scss"></style>
