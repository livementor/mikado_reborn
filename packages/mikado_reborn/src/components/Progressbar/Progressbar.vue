<template>
  <div
    class="mkr__progressbar"
    :class="`mkr__progressbar--${size}`"
    role="progressbar"
    aria-valuemin="0"
    :aria-valuemax="total"
    :aria-valuenow="current"
  >
    <div
      v-if="showEmoji"
      :class="[
        'mkr__progressbar__emoji',
        {
          'mkr__progressbar__emoji--visible': isCompleted,
        },
      ]"
    >
      <slot> 👍 </slot>
    </div>
    <div v-if="!hideState" class="mkr__progressbar__text">{{ current }}/{{ total }}</div>
    <div class="mkr__progressbar__bar">
      <span :style="spanStyle" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, withDefaults, defineProps } from 'vue';

const props = withDefaults(
  defineProps<{
    current?: number,
    total: number,
    shrinkEmoji: boolean,
    size: 'small' | 'medium',
    hideState?: boolean,
  }>(),
  {
    current: 0,
    shrinkEmoji: false,
    size: 'medium',
    hideState: false,
  },
);

const isCompleted = computed<boolean>(() => props.total > 0 && props.current >= props.total);
const showEmoji = computed<boolean>(() => props.isCompleted || !props.shrinkEmoji);
const spanStyle = computed(() => {
  const percentage = Math.max(Math.min((props.current / props.total) * 100, 100), 0);
  return {
    transform: props.current <= 0 ? 'translateX(-4px)' : '', // hide border-width
    width: `${percentage}%`,
  };
});

</script>

<style src="./Progressbar.scss" lang="scss"></style>
