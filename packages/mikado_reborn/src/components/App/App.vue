<script lang="ts">
import { CreateElement, RenderContext, VNode } from 'vue';
import { mergeData } from 'vue-functional-data-merge';

export default {
  functional: true,
  render(h: CreateElement, { data, children }: RenderContext) : VNode {
    const appData = {
      staticClass: 'mkr__app',
    };

    return h('div', mergeData(data, appData), children);
  },
};
</script>

<style src="./App.scss" lang="scss"></style>
