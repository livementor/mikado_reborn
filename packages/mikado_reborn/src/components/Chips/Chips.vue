<template>
  <li
    :id="componentId"
    :class="classes"
    role="option"
    tabindex="-1"
    :aria-selected="selected"
    @click="selectValue"
  >
    <mkr-icon v-if="selected" name="check" />
    {{ label }}
  </li>
</template>

<script lang="ts">
import {
  Component, Prop, Mixins, InjectReactive,
} from 'vue-property-decorator';
import { ChipsListProvide } from './ChipsList.vue';
import Uuid from '../../mixins/uuid';

import { MkrIcon } from '../Icon';

@Component({
  components: {
    MkrIcon,
  },
})
export default class Chips extends Mixins(Uuid) {
  @InjectReactive('list') readonly list?: ChipsListProvide;

  @Prop({ type: String, default: '' })
  readonly label!: string;

  @Prop({ type: String, default: '' })
  readonly value!: string;

  get componentId(): string {
    return `chips-${this.uuid}`;
  }

  get classes(): (string | { [className: string]: boolean })[] {
    return [
      'mkr__chips',
      {
        'mkr__chips--selected': this.selected,
        'mkr__chips--small': this.list ? this.list.size === 'small' : false,
      },
    ];
  }

  get selected(): boolean {
    if (this.list) return this.list.value === this.value;
    return false;
  }

  created(): void {
    if (this.list) this.list.registerChips(this);
  }

  beforeDestroy(): void {
    if (this.list) this.list.unregisterChips(this.uuid);
  }

  selectValue(): void {
    if (this.list) {
      if (this.selected) {
        this.list.emitChange('');
      } else {
        this.list.emitChange(this.value);
      }
    }
  }
}
</script>

<style src="./Chips.scss" lang="scss"></style>
