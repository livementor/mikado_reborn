<template>
  <div>
    <div class="mkr__stepper">
      <!-- Header -->
      <div class="mkr__stepper-header">
        <template v-for="({ type, label }, i) in itemsAsObject" :key="i">
          <!-- Header Divider -->
          <div v-if="i !== 0" class="mkr__stepper-header__divider" />
          <!-- Header Item -->
          <div
            class="mkr__stepper-header__item"
            :class="{ 'current': step === i + 1 }"
          >
          <StepperIcon
            v-if="step > i + 1 || type !== 'default'"
            :type="type"
          />
          <div v-else class="mkr__stepper-header__item-number">
            {{ i + 1 }}
          </div>
          <div class="mkr__stepper-header__item-title">
            {{ label }}
          </div>
        </div>
      </template>
    </div>
  </div>
  <!-- Body -->
  <div v-for="i in items.length" :key="i" class="mkr__stepper--body">
    <slot v-if="step === i" :name="`step_${i}`" />
  </div>
</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import StepperIcon from './StepperIcon.vue';

export type StepperItem = { type: string; label: string };

const props = withDefaults(
  defineProps<{
    items: Array<string | StepperItem>,
    step: number
  }>(),
  { step: 1 },
);

const itemsAsObject: StepperItem[] = computed(() => props.items.map((item: string | StepperItem) => {
  if (typeof item === 'string') {
    return {
      type: 'default',
      label: item,
    };
  }
  return item;
}));

</script>

<style src="./Stepper.scss" lang="scss"></style>
