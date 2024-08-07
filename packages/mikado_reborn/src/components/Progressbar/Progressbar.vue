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

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    computed: {
        isCompleted(): boolean {
            return this.total > 0 && this.current >= this.total;
        },
        showEmoji(): boolean {
            return this.isCompleted || !this.shrinkEmoji;
        },
        spanStyle(): Partial<CSSStyleDeclaration> {
            const percentage = Math.max(Math.min((this.current / this.total) * 100, 100), 0);
            return {
              transform: this.current <= 0 ? 'translateX(-4px)' : '', // hide border-width
              width: `${percentage}%`,
            };
        }
    },
    props: {
        current: { type: Number, default: 0 },
        total: { type: Number, required: true },
        shrinkEmoji: { type: Boolean, required: false, default: false },
        size: {
                required: false,
                default: 'medium',
                validator: (size: string) => ['small', 'medium'].includes(size),
            type: Object as PropType<'small' | 'medium'>
        },
        hideState: { type: Boolean, required: false, default: false }
    }
})

</script>

<style src="./Progressbar.scss" lang="scss"></style>
