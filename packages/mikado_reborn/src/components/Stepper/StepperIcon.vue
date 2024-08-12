<template>
  <Icon
    style="font-size: 24px; height: 24px; width: 24px"
    v-bind="iconProperties"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Icon from '../Icon/Icon.vue';

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    type: {
      type: String as () => 'default' | 'warning' | 'error',
      validator(value: string) {
        return ['default', 'warning', 'error'].includes(value);
      },
      required: true,
    },
  },
  setup(props: { type: 'default' | 'warning' | 'error' }) {
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

    return {
      iconProperties,
    };
  },
});
</script>
