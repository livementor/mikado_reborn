<template>
  <Teleport :to="domTarget">
  <div class="mkr__overlay"
    :class="[
      `mkr__overlay--${color}`,
      {
        'mkr__overlay--opened': value,
      },
    ]"
    @click="click"
  >
    <slot />
  </div>
  </Teleport>
</template>

<script lang="ts" setup>
import {
  withDefaults, watch, onBeforeUnmount,
} from 'vue';

const value = defineModel();
const props = withDefaults(
  defineProps<{
    color?: 'dark' | 'light',
    keepOnClick?: boolean,
    domTarget?: string
  }>(),
  {
    color: 'dark',
    keepOnClick: false,
    domTarget: 'body'
  },
);

const emit = defineEmits(['click', 'input']);

// functions
const click = () => {
  if (!props.keepOnClick) {
    value.value = false;
    emit('input', false);
  }
  emit('click');
};
const onOpenedChanged = (isOpen: boolean) => {
  document.body.style.overflow = isOpen ? 'hidden' : 'visible';
};


onBeforeUnmount(() => {
  document.body.style.overflow = 'visible';
});

watch(() => props.value, onOpenedChanged);

</script>

<style src="./Overlay.scss" lang="scss"></style>
