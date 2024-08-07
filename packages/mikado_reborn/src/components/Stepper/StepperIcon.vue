<template>
  <Icon
    style="font-size: 24px; height: 24px; width: 24px"
    v-bind="iconProperties"
  />
</template>

<script lang="ts">
import Icon from '../Icon/Icon.vue';
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Icon,
  },
    computed: {
        iconProperties() {
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

                return types[this.type] || types.default;
        }
    },
    props: {
        type: { type: String, required: true }
    }
})

</script>
