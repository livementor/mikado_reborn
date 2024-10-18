<template>
  <div ref="dropdown" class="mkr__dropdown">
    <button
      ref="dropdownInput"
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
          'mkr__dropdown__input__value--placeholder': !model && placeholder
        }"
        v-text="
          (selectedItem && (selectedItem[itemInputLabel] || selectedItem[itemLabel])) ||
          placeholder
        "
      />
      <mkr-icon :name="isTooltipVisible ? 'arrow-full-top' : 'arrow-full-bottom'" />
    </button>
    <mkr-card
      ref="dropdownList"
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

<script lang="ts" setup>
import {
  withDefaults, nextTick, onMounted, ref, computed, defineProps, defineEmits,
} from 'vue';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import useUuid from '../../composables/useUuid';
import { MkrCard } from '../Card';
import { MkrIcon } from '../Icon';

export type Item = {
  [key: string]: string | number | boolean;
  selected?: boolean;
  id?: string;
};

const props = withDefaults(
  defineProps<{
    placeholder?: string,
    items: Item[] | string[],
    itemValue?: string,
    itemLabel?: string,
    itemInputLabel?: string,
    error?: boolean,
  }>(),
  {
    itemValue: 'value',
    itemLabel: 'label',
    itemInputLabel: 'inputLabel',
    error: false,
  },
);

const model = defineModel();

const emit = defineEmits(['focus', 'blur', 'click', 'input', 'change']);

// Refs
const dropdownInput = ref<HTMLElement | null>(null);
const dropdownList = ref<HTMLElement | null>(null);
const buttonClick = ref(false);
const isTooltipVisible = ref(false);
const popperInstance = ref<PopperInstance | null>(null);
const currentSearch = ref('');
const clearCurrentSearchTimeout = ref<number | null>(null);
const uuid = useUuid().generateUUID();

// Computed properties
const componentId = computed(() => `dropdown-${uuid}`);

const itemList = computed(() => props.items.map((item, index) => {
  const id = `${componentId.value}-option-${index}`;

  if (typeof item === 'string') {
    return {
      [props.itemValue]: item,
      [props.itemLabel]: item,
      [props.itemInputLabel]: item,
      selected: item === model.value,
      id,
    };
  }

  return {
    ...item,
    selected: item[props.itemValue] === model.value,
    id,
  };
}));

const selectedItem = computed(() => itemList.value.find((item) => item.selected));

const selectedItemIndex = computed(() => itemList.value.findIndex((item) => item.selected));

// Functions
const showTooltip = async () => {
  isTooltipVisible.value = true;
  if (popperInstance.value) await popperInstance.value.update();
  await nextTick();
  const dropdownElement = dropdownList.value?.$el.querySelector('ul');
  dropdownElement?.focus();
};

const hideTooltip = () => {
  isTooltipVisible.value = false;
};

const toggleTooltip = () => {
  if (isTooltipVisible.value) {
    hideTooltip();
  } else {
    showTooltip();
  }
};

const handleButtonClick = (event: Event) => {
  toggleTooltip();
  buttonClick.value = false;
  emit('click', event);
};

const clearCurrentSearch = () => {
  if (clearCurrentSearchTimeout.value) {
    clearTimeout(clearCurrentSearchTimeout.value);
    clearCurrentSearchTimeout.value = null;
  }
  clearCurrentSearchTimeout.value = window.setTimeout(() => {
    currentSearch.value = '';
    clearCurrentSearchTimeout.value = null;
  }, 500);
};

const selectItem = (item: Item) => {
  model.value = item[props.itemValue];
  emit('input', item[props.itemValue]);
  emit('change', item[props.itemValue]);
  // Scroll selected item into view if needed
  const dropdownElement = dropdownList.value?.$el.querySelector('ul');
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
};

const searchItem = (key: KeyboardEvent['key']) => {
  currentSearch.value += key;

  const matchedItem = itemList.value.find((item) => {
    if (typeof item[props.itemLabel] !== 'string') return false;
    const itemLabel = item[props.itemLabel] as string;
    return itemLabel.toLowerCase().startsWith(currentSearch.value.toLowerCase());
  });

  if (matchedItem) {
    selectItem(matchedItem);
  }
  clearCurrentSearch();
};

const handleItemListClick = (item: Item) => {
  selectItem(item);
  dropdownInput.value?.focus();
  hideTooltip();
};

const handleListKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault();
      if (selectedItemIndex.value - 1 >= 0) {
        selectItem(itemList.value[selectedItemIndex.value - 1]);
      }
      break;
    case 'ArrowDown':
      event.preventDefault();
      if (selectedItemIndex.value + 1 < itemList.value.length) {
        selectItem(itemList.value[selectedItemIndex.value + 1]);
      }
      break;
    case 'Enter':
    case 'Escape':
      event.preventDefault();
      hideTooltip();
      dropdownInput.value?.focus();
      break;
    default:
      if (!['Shift', 'Control', 'Meta', 'Alt'].includes(event.key)) {
        searchItem(event.key);
      }
      break;
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowDown':
      event.preventDefault();
      showTooltip();
      handleListKeyDown(event);
      break;
    default:
  }
};

const handleListBlur = () => {
  if (!buttonClick.value) hideTooltip();
};

onMounted(() => {
  if (dropdownInput.value && dropdownList.value) {
    popperInstance.value = createPopper(dropdownInput.value, dropdownList.value.$el, {
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
});

</script>

<style src="./Dropdown.scss" lang="scss"></style>
