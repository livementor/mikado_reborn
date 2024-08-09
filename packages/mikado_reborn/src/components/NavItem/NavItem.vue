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

<script lang="ts">
import { defineComponent, computed } from 'vue';
import MkrIcon from '../Icon/Icon.vue';
import MkrTooltip from '../Tooltip/Tooltip.vue';
import './NavItem.scss';

export default defineComponent({
  components: {
    MkrIcon,
    MkrTooltip,
  },
  props: {
    active: { type: Boolean, default: false },
    title: { type: String, default: undefined },
    icon: { type: String, default: undefined },
  },
  setup(props, { emit, attrs, slots }) {
    const classes = computed(() => [
      'mkr__nav-item',
      {
        'mkr__nav-item--icon-only': !slots.default,
        'mkr__nav-item--active': props.active,
      },
    ]);

    const isRouterLink = computed(() => !!attrs.to);
    const component = computed(() => (isRouterLink.value ? 'RouterLink' : 'a'));

    const emitClick = (event: Event) => {
      emit('click', event);
    };

    return {
      classes,
      component,
      emitClick,
    };
  },
});
</script>
