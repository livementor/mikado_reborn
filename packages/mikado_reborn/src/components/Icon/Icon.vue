<template>
  <span class="mkr__icon" :class="classNames" @click="click"/>
</template>

<script lang="ts" setup>

import { computed } from 'vue';

const props = defineProps<{ name: string, color?: string }>();

const classNames = computed(() => {
  const classes = [];
  if (props.color) classes.push(props.color);
  if (props.name) classes.push(`icon-${props.name}`);
  return classes;
})

const emit = defineEmits(['click'])

const click = (e) => {
  emit('click', e);
}

</script>
<style src="./Icon.scss" lang="scss"></style>
