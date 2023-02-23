<template>
  <ul
    role="listbox"
    tabindex="0"
    aria-multiselectable="false"
    :aria-orientation="orientation === 'row' ? 'horizontal' : 'vertical'"
    class="mkr__chips-list"
    :class="[
      `mkr__chips-list--${orientation}`,
      `mkr__chips-list--${size}`,
      { 'mkr__chips-list--wrap': wrap },
    ]"
    @focus="focusHandler"
    @keydown="handleKeyDown"
  >
    <slot />
  </ul>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, ProvideReactive, Watch,
} from 'vue-property-decorator';
import Chips from './Chips.vue';

export type ChipsListProvide = {
  value?: string | null;
  size: 'medium' | 'small';
  orientation: 'row' | 'column';
  wrap: boolean;
  emitChange: (value: string) => void;
  registerChips: (chips: Chips) => void;
  unregisterChips: (uuid: string) => void;
};

@Component({
  model: {
    event: 'change',
  },
})
export default class ChipsList extends Vue {
  @Prop({
    required: true,
    validator: (value) => ['string'].includes(typeof value) || value === null,
  })
  readonly value!: string | null;

  @Prop({
    type: String,
    default: 'medium',
    validator: (size) => ['medium', 'small'].includes(size),
  })
  readonly size!: 'medium' | 'small';

  @Prop({
    type: String,
    default: 'row',
    validator: (size) => ['row', 'column'].includes(size),
  })
  readonly orientation!: 'row' | 'column';

  @Prop({
    type: Boolean,
    default: false,
  })
  readonly wrap!: boolean;

  @ProvideReactive() list: ChipsListProvide = {
    value: this.value,
    size: this.size,
    orientation: this.orientation,
    wrap: this.wrap,
    emitChange: this.emitChange,
    registerChips: this.registerChips,
    unregisterChips: this.unregisterChips,
  };

  chips: Chips[] = [];

  focusedIndex = 0;

  updated(): void {
    this.chips.sort((leftChild, rightChild) => {
      const x = Array.from(this.$el.children);
      return x.indexOf(leftChild.$el) - x.indexOf(rightChild.$el);
    });
  }

  @Watch('value')
  onValueChanged(): void {
    this.list = { ...this.list, value: this.value };
  }

  @Watch('size')
  onSizeChanged(): void {
    this.list = { ...this.list, size: this.size };
  }

  emitChange(value: string): void {
    this.$emit('change', value);
  }

  focusHandler(): void {
    this.focusedIndex = 0;
    const firstChip = this.chips[0].$el as HTMLElement;
    firstChip.focus();
  }

  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        event.preventDefault();
        if (this.focusedIndex < this.chips.length - 1) {
          this.focusedIndex += 1;
          const chipToFocus = this.chips[this.focusedIndex].$el as HTMLElement;
          chipToFocus.focus();
        }
        break;
      }
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        if (this.focusedIndex > 0) {
          this.focusedIndex -= 1;
          const chipToFocus = this.chips[this.focusedIndex].$el as HTMLElement;
          chipToFocus.focus();
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.chips[this.focusedIndex].value === this.value) {
          this.emitChange('');
        } else {
          this.emitChange(this.chips[this.focusedIndex].value);
        }
        break;
      default:
        break;
    }
  }

  registerChips(chips: Chips): void {
    this.chips.push(chips);
  }

  unregisterChips(uuid: string): void {
    this.chips = this.chips.filter((chips) => chips.uuid !== uuid);
  }
}
</script>

<style src="./ChipsList.scss" lang="scss"></style>
