<template>
  <component
    :is="component"
    :class="classes"
    v-bind="$attrs"
    @click="click"
  >
    <MkrIcon :name="name" />
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import MkrIcon from '../Icon/Icon.vue';
import './InteractiveIcon.scss';

export const interactiveIconThemes = {
  light: 'light',
  dark: 'dark',
  customColor: 'customColor',
};

export default defineComponent({
  components: {
    MkrIcon,
  },
  props: {
    name: { type: String, required: true },
    theme: {
      default: 'light',
      type: String,
      validator: (theme: keyof typeof interactiveIconThemes) => Object.values(interactiveIconThemes).includes(theme),
    },
    activated: { default: false, type: Boolean },
  },
  setup(props, { emit, attrs }) {
    const classBase = 'mkr__interactive-icon';

    const classes = computed(() => [
      classBase,
      `${classBase}--${props.theme}`,
      { [`${classBase}--${props.theme}--activated`]: props.activated },
    ]);

    const isRouterLink = computed(() => !!attrs.to);
    const isLink = computed(() => !!attrs.href);

    const component = computed(() => {
      if (isRouterLink.value) {
        return 'RouterLink';
      }
      if (isLink.value) {
        return 'a';
      }
      return 'button';
    });

    const click = (event: Event) => {
      emit('click', event);
    };

    return {
      classes,
      component,
      click,
    };
  },
});
</script>
