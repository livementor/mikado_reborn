<template>
  <li :class="classes">
    <MkrTooltip
      :disabled="!tooltipLabel"
      :label="tooltipLabel"
      :close-on-scroll="locked"
    >
      <component
        v-bind="linkAttrs()"
        :is="component"
        @click="onClick"
        @keydown.enter="onLockedKeydown"
      >
        <MkrIcon
          v-if="locked"
          name="lock-closed"
        />
        <slot
          v-else
          name="icon"
        >
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
  defineProps<{
    active?: boolean,
    title?: string,
    icon?: string,
    locked?: boolean,
    lockTooltip?: string,
  }>(),
  { active: false, locked: false },
);
const emit = defineEmits<{
  click: [event: Event],
  'locked-click': [event: Event],
}>();

const slots = useSlots();

const classes = computed(() => [
  'mkr__nav-item',
  {
    'mkr__nav-item--icon-only': !hasSlotContent(slots['default']),
    'mkr__nav-item--active': props.active && !props.locked,
    'mkr__nav-item--locked': props.locked,
  },
]);

const tooltipLabel = computed(() => (props.locked ? props.lockTooltip || props.title : props.title));

const attrs = useAttrs();

const isRouterLink = computed(() => !!attrs.to);
const component = computed(() => (isRouterLink.value && !props.locked ? 'RouterLink' : 'a'));

// A locked item renders a link without destination so that it can never navigate.
const LOCKED_OMITTED_ATTRS = ['to', 'href', 'target'];
const linkAttrs = () => {
  if (!props.locked) return attrs;

  return {
    ...Object.fromEntries(
      Object.entries(attrs).filter(([key]) => !LOCKED_OMITTED_ATTRS.includes(key)),
    ),
    role: 'link',
    tabindex: 0,
    'aria-disabled': 'true',
  };
};

const onClick = (event: Event) => {
  if (props.locked) {
    event.preventDefault();
    emit('locked-click', event);
    return;
  }
  emit('click', event);
};

// Anchors without href do not trigger click on Enter.
const onLockedKeydown = (event: KeyboardEvent) => {
  if (props.locked) onClick(event);
};

</script>

<style src="./NavItem.scss" lang="scss"></style>
