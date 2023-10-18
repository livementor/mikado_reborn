<template>
  <Icon
    style="font-size: 24px; height: 24px; width: 24px"
    v-bind="iconProperties"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Icon from '../Icon/Icon.vue';

@Component({
  components: {
    Icon,
  },
})
export default class StepperIcon extends Vue {
  @Prop({ type: String, required: true })
  public type!: 'default' | 'warning' | 'error';

  get iconProperties() {
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
}
</script>
