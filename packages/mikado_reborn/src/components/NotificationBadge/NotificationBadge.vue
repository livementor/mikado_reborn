<template>
  <span class="mkr__notification-badge" :class="[{ 'mkr__notification-badge--show': show }]">
    <slot></slot>
  </span>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

withDefaults(
  defineProps<{ show: boolean }>(),
  { show: false },
);

</script>

<style src="./NotificationBadge.scss" lang="scss"></style>
