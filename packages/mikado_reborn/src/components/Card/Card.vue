<script lang="ts">
import { CreateElement, RenderContext, VNode } from 'vue';
import { mergeData } from 'vue-functional-data-merge';

export default {
  functional: true,
  props: {
    elevated: {
      type: Boolean,
      default: false,
    },
  },
  render(h: CreateElement, { props, data, children }: RenderContext) : VNode {
    const cardData = {
      staticClass: 'mkr__card',
      class: {
        'mkr__card--elevated': props.elevated,
      },
    };

    return h('div', mergeData(data, cardData), children);
  },
};
</script>

<style src="./Card.scss" lang="scss"></style>
