<template>
  <li :class="classes">
    <MkrTooltip
      :disabled="!title"
      :label="title"
    >
      <component
        v-bind="$attrs"
        :is="component"
        @click="emitClick"
      >
        <slot name="icon">
          <MkrIcon
            v-if="icon"
            :name="icon"
          />
        </slot>
        <slot />
      </component>
    </MkrTooltip>
  </li>
</template>

<script lang="ts" setup>
import {
  computed, useAttrs, useSlots,
} from 'vue';
import MkrIcon from '../Icon/Icon.vue';
import MkrTooltip from '../Tooltip/Tooltip.vue';
import { hasSlotContent } from '../../composables/useCheckSlotContent';

const props = withDefaults(
  defineProps<{ active?: boolean, title?: string, icon?: string }>(),
  { active: false },
);
const emit = defineEmits(['click']);

const slots = useSlots();

const classes = computed(() => [
  'mkr__nav-item',
  {
    'mkr__nav-item--icon-only': !hasSlotContent(slots['default']),
    'mkr__nav-item--active': props.active,
  },
]);

const attrs = useAttrs();

const isRouterLink = computed(() => !!attrs.to);
const component = computed(() => (isRouterLink.value ? 'RouterLink' : 'a'));

const emitClick = (event: Event) => { emit('click', event); };

</script>

<style src="./NavItem.scss" lang="scss"></style>
