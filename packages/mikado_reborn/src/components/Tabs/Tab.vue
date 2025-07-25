<template>
  <button
    :class="classes"
    :disabled="disabled"
    @click="selectTab"
    type="button"
    role="tab"
    :aria-selected="isActive"
    :tabindex="isActive ? 0 : -1"
  >
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted } from 'vue'

export interface TabsListProvide {
  activeValue: string;
  size: 'large' | 'medium';
  updateValue: (value: string) => void;
  registerTab: (value: string) => void;
}

const props = withDefaults(
  defineProps<{
    label: string;
    value: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

const tabsList = inject<TabsListProvide>('tabsList');

const isActive = computed(() => {
  return tabsList ? tabsList.activeValue === props.value : false;
});

const classes = computed(() => [
  'mkr__tab',
  {
    'mkr__tab--active': isActive.value,
    'mkr__tab--disabled': props.disabled,
    'mkr__tab--large': tabsList?.size === 'large',
    'mkr__tab--medium': tabsList?.size === 'medium',
  }
]);

const selectTab = () => {
  if (!props.disabled && tabsList) {
    tabsList.updateValue(props.value);
  }
};

// Register this tab with the parent TabList on mount
onMounted(() => {
  if (tabsList) {
    tabsList.registerTab(props.value);
  }
});
</script>

<style src="./Tab.scss" lang="scss"></style>