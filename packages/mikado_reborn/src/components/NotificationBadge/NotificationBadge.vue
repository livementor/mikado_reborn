<script lang="ts">
import { CreateElement, RenderContext, VNode } from 'vue';

export default {
  functional: true,
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  render(h: CreateElement, { props, children }: RenderContext) : VNode {
    const notificationBadgeData = {
      staticClass: 'mkr__notification-badge',
      class: [
        {
          'mkr__notification-badge--show': props.show,
        },
      ],
    };

    return h('span', notificationBadgeData, children);
  },
};
</script>

<style src="./NotificationBadge.scss" lang=scss></style>
