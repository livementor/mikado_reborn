<template>
  <component
    :is="componentType"
    :class="buttonClasses"
    v-bind="attributes"
    :disabled="disabled"
    @click="handleClick"
  >
    <MkrIcon v-if="icon && iconSide === 'left'" :name="icon" :class="`${baseClass}__icon--left`" />
    <slot></slot>
    <MkrIcon v-if="icon && iconSide === 'right'" :name="icon" :class="`${baseClass}__icon--right`" />
  </component>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { MkrIcon } from '../../components/Icon';
import './Button.scss';

export default defineComponent({
  name: 'MkrButton',
  components: { MkrIcon },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (size) => ['small', 'medium', 'large'].includes(size),
    },
    icon: {
      type: String,
      default: undefined,
    },
    iconSide: {
      type: String,
      default: 'left',
      validator: (side) => ['left', 'right'].includes(side),
    },
    variant: {
      type: String,
      default: 'contained',
      validator: (variant) => ['contained', 'outlined', 'text'].includes(variant),
    },
    theme: {
      type: String,
      default: '',
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, emit, attrs }) {
    const baseClass = 'mkr__button';

    const hasContent = computed(() => slots.default && slots.default().length > 0);
    const componentClass = computed(() => `${baseClass}--${props.variant}`);
    const themeClass = computed(() => (props.theme ? `${componentClass.value}--${props.theme}` : ''));

    const buttonClasses = computed(() => [
      baseClass,
      `${baseClass}--${props.size}`,
      !hasContent.value && `${baseClass}--icon-only`,
      componentClass.value,
      themeClass.value,
      props.activated && `${themeClass.value}--activated`,
    ].filter(Boolean).join(' '));

    const isRouterLink = computed(() => 'to' in attrs);
    const isLink = computed(() => 'href' in attrs);

    const componentType = computed(() => {
      if (isRouterLink.value) return 'RouterLink';
      if (isLink.value) return 'a';
      return 'button';
    });

    const handleClick = (event) => emit('click', event);

    console.log(attrs);
    const attributes = computed(() => ({
      ...attrs,
      disabled: props.disabled,
    }));

    return {
      baseClass,
      buttonClasses,
      componentType,
      handleClick,
      attributes,
    };
  },
});
</script>
