<template>
  <Teleport :to="domTarget">
  <div class="mkr__overlay"
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
  emit('click');
};


</script>

<style src="./Overlay.scss" lang="scss"></style>
