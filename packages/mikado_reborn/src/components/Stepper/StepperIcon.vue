<template>
  <Icon
    v-bind="iconProperties"
    style="font-size: 24px; height: 24px; width: 24px"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Icon from '../Icon/Icon.vue';

const props = withDefaults(
  defineProps<{ type: 'default' | 'warning' | 'error' }>(),
  { type: 'default' },
);

const iconProperties = computed(() => {
  const types = {
    default: {
      name: 'check-circle',
      color: 'secondary',
    },
    warning: {
      name: 'exclamation-circle',
      color: 'warning',
    },
    error: {
      name: 'cross-circle',
      color: 'danger',
    },
  };

  return types[props.type] || types.default;
});

</script>
