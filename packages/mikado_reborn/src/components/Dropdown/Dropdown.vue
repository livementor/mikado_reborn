<template>
  <div ref="dropdown" class="mkr__dropdown">
    <button
      ref="dropdown-input"
      aria-haspopup="listbox"
      :aria-placeholder="placeholder"
      :aria-expanded="isTooltipVisible"
      class="mkr__dropdown__input"
      :class="{
        'mkr__dropdown__input--focused': isTooltipVisible,
        'mkr__dropdown__input--error': error,
      }"
      type="button"
      @click="handleButtonClick"
      @mousedown="buttonClick = true"
      @keydown="handleKeyDown"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    >
      <span
        class="mkr__dropdown__input__value"
        :class="{
          'mkr__dropdown__input__value--placeholder': !value && placeholder
        }"
        v-text="
          (selectedItem && (selectedItem[itemInputLabel] || selectedItem[itemLabel])) ||
          placeholder
        "
      />
      <mkr-icon :name="isTooltipVisible ? 'arrow-full-top' : 'arrow-full-bottom'" />
    </button>
    <mkr-card
      ref="dropdown-list"
      class='mkr__dropdown__list'
      :class="{
        'mkr__dropdown__list--hidden': !isTooltipVisible,
      }"
      elevated
      border
    >
      <ul
        class="mkr__dropdown__list__container"
        tabindex="-1"
        role="listbox"
        :aria-activedescendant="selectedItem ? selectedItem.id : null"
        @blur="handleListBlur"
        @keydown="handleListKeyDown"
      >
        <li
          v-for="item in itemList"
          :key="item.id"
          :id="item.id"
          :aria-selected="item.selected"
          role="option"
          class="mkr__dropdown__list__item"
          @click.stop.prevent="handleItemListClick(item)"
        >
          <slot name="item" :item="item" :is-selected="item.selected">
            <mkr-icon v-if="item.selected" name="check" />
            {{ item[itemLabel] }}
          </slot>
        </li>
      </ul>
    </mkr-card>
  </div>
</template>

<script lang="ts">
import {
  Component, Mixins, Prop,
} from 'vue-property-decorator';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import Uuid from '../../mixins/uuid';

import { MkrCard } from '../Card';
import { MkrIcon } from '../Icon';

export type Item = {
  [key: string]: string | number | boolean
  selected: boolean
  id: string
}

@Component({
  components: {
    MkrCard,
    MkrIcon,
  },
})
export default class Dropdown extends Mixins(Uuid) {
  @Prop({ type: String })
  readonly value!: string

  @Prop({ type: String })
  readonly placeholder!: string

  @Prop({ type: Array, required: true })
  readonly items!: (string | Record<string, string>)[]

  @Prop({ type: String, default: 'value' })
  readonly itemValue!: string

  @Prop({ type: String, default: 'label' })
  readonly itemLabel!: string

  @Prop({ type: String, default: 'inputLabel' })
  readonly itemInputLabel!: string

  @Prop({ type: Boolean, default: true })
  error!: boolean

  isTooltipVisible = false

  // Flag button click on mousedown before blur event is trigger

  buttonClick = false

  popperInstance: PopperInstance | null = null

  currentSearch = ''

  clearCurrentSearchTimeout: ReturnType<typeof setTimeout> | null = null

  get componentId(): string {
    return `dropdown-${this.uuid}`;
  }

  get itemList(): Item[] {
    return this.items.map((item, index) => {
      const id = `${this.componentId}-option-${index}`;

      if (typeof item === 'string') {
        return {
          [this.itemValue]: item,
          [this.itemLabel]: item,
          [this.itemInputLabel]: item,
          selected: item === this.value,
          id,
        };
      }
      return {
        ...item,
        selected: item[this.itemValue] === this.value,
        id,
      };
    });
  }

  get selectedItem(): Item | undefined {
    return this.itemList.find((item) => item.selected);
  }

  get selectedItemIndex(): number {
    return this.itemList.findIndex((item) => item.selected);
  }

  mounted(): void {
    const input = this.$refs['dropdown-input'] as HTMLElement;
    const dropdownList = this.$refs['dropdown-list'] as HTMLElement;
    this.popperInstance = createPopper(input, dropdownList, {
      placement: 'bottom-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
    });
  }

  async showTooltip(): Promise<void> {
    this.isTooltipVisible = true;
    if (this.popperInstance) await this.popperInstance.update();
    await this.$nextTick();
    const dropdownElement = (this.$refs['dropdown-list'] as HTMLElement).querySelector('ul');
    if (dropdownElement) {
      dropdownElement.focus();
    }
  }

  hideTooltip(): void {
    this.isTooltipVisible = false;
  }

  toggleTooltip() {
    if (this.isTooltipVisible) {
      this.hideTooltip();
    } else {
      this.showTooltip();
    }
  }

  handleButtonClick(event: Event): void {
    this.toggleTooltip();
    this.buttonClick = false;
    this.$emit('click', event);
  }

  handleItemListClick(item: Item): void {
    this.selectItem(item);
    (this.$refs['dropdown-input'] as HTMLElement).focus();
    this.hideTooltip();
  }

  selectItem(item: Item): void {
    this.$emit('input', item[this.itemValue]);
    this.$emit('change', item[this.itemValue]);
    // Scroll selected item into view if needed
    const dropdownElement = (this.$refs['dropdown-list'] as HTMLElement).querySelector('ul');
    if (dropdownElement) {
      const selectedElement = dropdownElement.querySelector(`#${item.id}`);
      if (selectedElement) {
        const dropdownElementPosition = dropdownElement.getBoundingClientRect();
        const selectedElementPosition = selectedElement.getBoundingClientRect();
        if (dropdownElementPosition.bottom - selectedElementPosition.bottom < 0) {
          dropdownElement.scrollBy({
            top: selectedElementPosition.bottom - dropdownElementPosition.bottom,
            behavior: 'smooth',
          });
        } else if (dropdownElementPosition.top - selectedElementPosition.top > 0) {
          dropdownElement.scrollBy({
            top: selectedElementPosition.top - dropdownElementPosition.top,
            behavior: 'smooth',
          });
        }
      }
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this.showTooltip();
        this.handleListKeyDown(event);
        break;
      default:
    }
  }

  handleListKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (this.selectedItemIndex - 1 >= 0) {
          this.selectItem(this.itemList[this.selectedItemIndex - 1]);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (this.selectedItemIndex + 1 < this.itemList.length) {
          this.selectItem(this.itemList[this.selectedItemIndex + 1]);
        }
        break;
      case 'Enter':
      case 'Escape':
        event.preventDefault();
        this.hideTooltip();
        (this.$refs['dropdown-input'] as HTMLElement).focus();
        break;
      default:
        if (!['Shift', 'Control', 'Meta', 'Alt'].includes(event.key)) {
          this.searchItem(event.key);
        }
        break;
    }
  }

  handleListBlur(): void {
    /* If blur comes from a click on the button, let the handleButtonClick hide the tooltip
    otherwise handleButtonClick will re-open the tooltip */
    if (!this.buttonClick) this.hideTooltip();
  }

  searchItem(key: KeyboardEvent['key']): void {
    this.currentSearch += key;

    const matchedItem = this.itemList
      .find((item) => {
        if (typeof item[this.itemLabel] !== 'string') return false;
        const itemLabel = item[this.itemLabel] as string;
        return itemLabel.toLowerCase().startsWith(this.currentSearch?.toLowerCase());
      });

    if (matchedItem) {
      this.selectItem(matchedItem);
    }
    this.clearCurrentSearch();
  }

  clearCurrentSearch(): void {
    if (this.clearCurrentSearchTimeout) {
      clearTimeout(this.clearCurrentSearchTimeout);
      this.clearCurrentSearchTimeout = null;
    }
    this.clearCurrentSearchTimeout = setTimeout(() => {
      this.currentSearch = '';
      this.clearCurrentSearchTimeout = null;
    }, 500);
  }
}
</script>

<style src="./Dropdown.scss" lang="scss"></style>
