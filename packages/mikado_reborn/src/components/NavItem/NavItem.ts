import { CreateElement, VNode, defineComponent } from 'vue';
import { MkrIcon } from '../Icon';
import { MkrTooltip } from '../Tooltip';

import './NavItem.scss';

export default defineComponent({
  components: {
    MkrIcon,
    MkrTooltip,
  },
  inheritAttrs: false,
    computed: {
        classes(): (string | { [className: string]: boolean; })[] {
            return [
              'mkr__nav-item',
              {
                'mkr__nav-item--icon-only': !this.hasContent,
                'mkr__nav-item--active': this.active,
              },
            ];
        },
        hasContent(): boolean {
            return Boolean(this.$slots.default?.length);
        },
        isRouterLink(): boolean {
            return !!this.$attrs.to;
        },
        component(): string {
            if (this.isRouterLink) {
                  return 'RouterLink';
                }

                return 'a';
        }
    },
    methods: {
        emitClick(event: MouseEvent): void {
            this.$emit('click', event);
        },
        render(createElement: CreateElement): VNode {
            let iconSlot = this.$slots.icon;

                if (!iconSlot && this.icon) {
                  iconSlot = [createElement(MkrIcon, {
                    props: { name: this.icon },
                  })];
                }

                const link = createElement(
                  this.component,
                  {
                    attrs: { ...this.$attrs },
                    on: {
                      click: this.emitClick,
                    },
                  },
                  [
                    iconSlot,
                    this.$slots.default,
                  ],
                );

                const item = createElement(
                  'li',
                  {
                    class: this.classes,
                  },
                  [
                    (this.title)
                      ? createElement(MkrTooltip, { props: { label: this.title } }, [link])
                      : link,
                  ],
                );

                return item;
        }
    },
    props: {
        active: { type: Boolean, default: false },
        title: { type: String, default: undefined },
        icon: { type: String, default: undefined }
    }
})
