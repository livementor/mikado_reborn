<template>
  <li :class="classes">
    <MkrTooltip :disabled="!title" :label="title">
      <component
        :is="component"
        v-bind="$attrs"
        @click="emitClick"
      >
        <slot name="icon">
          <MkrIcon v-if="icon" :name="icon" />
        </slot>
        <slot></slot>
      </component>
    </MkrTooltip>
  </li>
</template>

<script lang="ts" setup>
import {
  defineProps, withDefaults, computed, useAttrs, useSlots, defineEmits,
} from 'vue';
import MkrIcon from '../Icon/Icon.vue';
import MkrTooltip from '../Tooltip/Tooltip.vue';

const props = withDefaults(
  defineProps<{ active?: boolean, title?: string, icon?: string }>(),
  { active: false },
);
const emit = defineEmits(['click']);

const classes = computed(() => [
  'mkr__nav-item',
  {
    'mkr__nav-item--icon-only': !(useSlots()).default,
    'mkr__nav-item--active': props.active,
  },
]);

const isRouterLink = computed(() => !!(useAttrs()).to);
const component = computed(() => (isRouterLink.value ? 'RouterLink' : 'a'));

const emitClick = (event: Event) => { emit('click', event); };

</script>

<style src="./NavItem.scss" lang="scss"></style>
