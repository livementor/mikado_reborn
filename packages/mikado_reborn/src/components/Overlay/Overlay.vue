<template>
  <Teleport to=".mkr__app">
    <div
      class="mkr__overlay"
      :class="[
        `mkr__overlay--${color}`,
        'mkr__overlay--opened'
      ]"
      @click="click"
    >
      <slot />
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    color?: 'dark' | 'light',
    keepOnClick?: boolean,
  }>(),
  {
    color: 'dark',
    keepOnClick: false,
  },
);

const emit = defineEmits(['click', 'input']);

// functions
const click = () => {
  emit('click');
};


</script>

<style src="./Overlay.scss" lang="scss"></style>
