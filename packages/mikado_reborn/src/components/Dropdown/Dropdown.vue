<template>
  <div class="mkr__dropdown">
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
      @click="handleButtonClick"
      @keydown="handleKeyDown"
    >
      <span
        class="mkr__dropdown__input__value"
        :class="{
          'mkr__dropdown__input__value--placeholder': !value && placeholder
        }"
        v-text="(selectedItem && selectedItem.label) || placeholder"
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
    >
      <ul
        class="mkr__dropdown__list__container"
        tabindex="-1"
        role="listbox"
        :aria-activedescendant="selectedItem ? selectedItem.id : null"
        @blur="hideTooltip"
        @keydown="handleListKeyDown"
      >
        <li
          v-for="item in itemList"
          :key="item.id"
          :id="item.id"
          :aria-selected="item.selected"
          role="option"
          v-text="item.label"
          @click="handleItemListClick(item)"
        />
      </ul>
    </mkr-card>
  </div>
</template>

<script lang="ts">
import {
  Component, Mixins, Model, Prop,
} from 'vue-property-decorator';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import Uuid from '../../mixins/uuid';

import { MkrCard } from '../Card';
import { MkrIcon } from '../Icon';

type Item = {
  label: string
  value: string
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
  @Model('change', { type: String })
  readonly value!: string

  @Prop({ type: String })
  readonly placeholder!: string

  @Prop({ type: Array })
  readonly items!: (string | Record<string, string>)[]

  @Prop({ type: String })
  readonly itemValue?: string

  @Prop({ type: String })
  readonly itemLabel?: string

  @Prop({ type: Boolean, default: false })
  error!: boolean;

  isTooltipVisible = false

  popperInstance: PopperInstance

  currentSearch = ''

  clearCurrentSearchTimeout: ReturnType<typeof setTimeout> = null

  get componentId(): string {
    return `dropdown-${this.uuid}`;
  }

  get itemList(): Item[] {
    return this.items.map((item, index) => {
      let label = '';
      let value = '';
      if (typeof item === 'string') {
        label = item;
        value = item;
      } else {
        label = item[this.itemLabel || 'label'];
        value = item[this.itemValue || 'value'];
      }
      return {
        label,
        value,
        id: `${this.componentId}-option-${index}`,
        selected: value === this.value,
      };
    });
  }

  get selectedItem(): Item {
    return this.itemList.find((item) => item.selected);
  }

  get selectedItemIndex(): number {
    return this.itemList.findIndex((item) => item.selected);
  }

  mounted(): void {
    const input = this.$refs['dropdown-input'] as HTMLElement;
    const dropdown = this.$refs['dropdown-list'] as HTMLElement;
    this.popperInstance = createPopper(input, dropdown, {
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

  handleButtonClick(): void {
    if (this.isTooltipVisible) {
      this.hideTooltip();
    } else {
      this.showTooltip();
    }
  }

  handleItemListClick(item: Item): void {
    this.selectItem(item);
    (this.$refs['dropdown-input'] as HTMLElement).focus();
  }

  selectItem(item: Item): void {
    this.$emit('change', item.value);
    // Scroll selected item into view if needed
    const dropdownElement = (this.$refs['dropdown-list'] as HTMLElement).querySelector('ul');
    const selectedElement = dropdownElement.querySelector(`#${item.id}`);
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

  hideTooltip(): void {
    this.isTooltipVisible = false;
  }

  showTooltip(): void {
    this.isTooltipVisible = true;
    this.popperInstance.update();
    this.$nextTick(() => {
      (this.$refs['dropdown-list'] as HTMLElement).querySelector('ul').focus();
    });
  }

  searchItem(key: KeyboardEvent['key']): void {
    this.currentSearch += key;
    const matchedItem = this.itemList.find((item) => item.label.startsWith(this.currentSearch));
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