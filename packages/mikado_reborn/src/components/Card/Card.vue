<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { CreateElement, RenderContext, VNode } from 'vue';
import { mergeData } from 'vue-functional-data-merge';

export const radius = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

export default {
  functional: true,
  props: {
    elevated: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: String,
      default: 'small',
      validator: (value: string): boolean => Object.values(radius).includes(value),
    },
  },
  render(h: CreateElement, { props, data, children }: RenderContext) : VNode {
    const cardData = {
      staticClass: 'mkr__card',
      class: [
        `mkr__card--radius-${props.radius}`,
        {
          'mkr__card--elevated': props.elevated,
          'mkr__card--border': props.border,
        },
      ],
    };

    return h('div', mergeData(data, cardData), children);
  },
};
</script>

<style src="./Card.scss" lang="scss"></style>
