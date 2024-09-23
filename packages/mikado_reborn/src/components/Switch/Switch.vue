<template>
  <span
    class="mkr__switch"
    :class="{ 'mkr__switch--active': value }"
    role="checkbox"
    :aria-checked="value"
    tabindex="0"
    @click="toggle"
    @keydown.space.prevent="toggle"
  >
    <span class="mkr__switch__indicator" />
  </span>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ value: boolean }>();
const emit = defineEmits(['input']);

const toggle = () => emit('input', !props.value);

</script>

<style src="./Switch.scss" lang="scss"></style>
