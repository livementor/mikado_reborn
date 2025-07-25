<template>
  <div
    class="mkr__tab-list"
    :class="tabListClasses"
    role="tablist"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, watch, onMounted, ref } from 'vue'

export interface TabsListProvide {
  activeValue: string;
  size: 'large' | 'medium';
  updateValue: (value: string) => void;
  registerTab: (value: string) => void;
}

const model = defineModel<string>();

const props = withDefaults(
  defineProps<{
    size?: 'large' | 'medium';
  }>(),
  {
    size: 'large',
  }
);

const activeValue = ref(model.value || '');
const registeredTabs = ref<string[]>([]);

const tabListClasses = computed(() => [
  'mkr__tab-list',
  {
    'mkr__tab-list--large': props.size === 'large',
    'mkr__tab-list--medium': props.size === 'medium',
  }
]);

const updateValue = (value: string) => {
  activeValue.value = value;
  model.value = value;
};

const registerTab = (value: string) => {
  if (!registeredTabs.value.includes(value)) {
    registeredTabs.value.push(value);
    
    // If no active value is set and this is the first tab, make it active
    if (!activeValue.value && registeredTabs.value.length === 1) {
      updateValue(value);
    }
  }
};

// Provide context to child Tab components
const tabsListContext: TabsListProvide = reactive({
  activeValue: activeValue.value,
  size: props.size,
  updateValue,
  registerTab
});

provide('tabsList', tabsListContext);

// Watch for changes in activeValue to update the reactive context
watch(activeValue, (newValue) => {
  tabsListContext.activeValue = newValue;
});

// Watch for external model changes
watch(() => model.value, (newValue) => {
  if (newValue && newValue !== activeValue.value) {
    activeValue.value = newValue;
  }
});

// Watch for size changes
watch(() => props.size, (newSize) => {
  tabsListContext.size = newSize;
});

// Auto-select first tab if no model value provided
onMounted(() => {
  if (!model.value) {
    // We'll let the first Tab component register itself
    // This is handled by the Tab component on mount
  }
});
</script>

<style src="./TabList.scss" lang="scss"></style>