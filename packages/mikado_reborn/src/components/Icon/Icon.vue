<template>
  <span class="mkr__icon" :class="classNames" @click="$emit('click', $event)"/>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{ name: string, color?: string }>();
defineEmits(['click']);

const classNames = computed(() => {
  const classes = [];
  if (props.color) classes.push(props.color);
  if (props.name) classes.push(`icon-${props.name}`);
  return classes;
});

</script>
<style src="./Icon.scss" lang="scss"></style>
