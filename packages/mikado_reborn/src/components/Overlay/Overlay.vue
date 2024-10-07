<template>
  <div ref="overlayRef"
    class="mkr__overlay"
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
</template>

<script lang="ts" setup>
import {
  withDefaults, onMounted, inject, ref, watch, onBeforeUnmount,
} from 'vue';

const props = withDefaults(
  defineProps<{
    color?: 'dark' | 'light',
    keepOnClick?: boolean,
    value?: boolean, // native v-model ; original term = "opened"
  }>(),
  {
    color: 'dark',
    keepOnClick: false,
  },
);

const emit = defineEmits(['click', 'input']);

const appRef = inject('appRef');
const overlayRef = ref(null);

// functions
const click = () => {
  if (!props.keepOnClick) {
    emit('input', false);
  }
  emit('click');
};
const onOpenedChanged = (isOpen: boolean) => {
  document.body.style.overflow = isOpen ? 'hidden' : 'visible';
};

// hooks
onMounted(() => {
  appRef.value.insertBefore(overlayRef.value, appRef.value.children[0]);
});

onBeforeUnmount(() => {
  overlayRef.value?.remove();
  document.body.style.overflow = 'visible';
});

watch(() => props.value, onOpenedChanged);

</script>

<style src="./Overlay.scss" lang="scss"></style>
