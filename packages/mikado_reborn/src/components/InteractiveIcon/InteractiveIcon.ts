import { VNodeData, VNode, CreateElement, defineComponent } from 'vue';
import MkrIcon from '../Icon/Icon.vue';
import './InteractiveIcon.scss';

export const interactiveIconThemes = {
  light: 'light',
  dark: 'dark',
  customColor: 'customColor',
};

export default defineComponent({
  components: {
    MkrIcon,
  },
    data() {
        return {
            class: 'mkr__interactive-icon'
        };
    },
    computed: {
        classes(): VNodeData['class'] {
            return [
              this.class,
              `${this.class}--${this.theme}`,
              {
                [`${this.class}--${this.theme}--activated`]: this.activated,
              },
            ];
        },
        isRouterLink(): boolean {
            return !!this.$attrs.to;
        },
        isLink(): boolean {
            return !!this.$attrs.href;
        },
        component(): string {
            if (this.isRouterLink) {
              return 'RouterLink';
            } if (this.isLink) {
              return 'a';
            }
            return 'button';
        }
    },
    methods: {
        click(event: Event): void {
            this.$emit('click', event);
        },
        render(createElement: CreateElement): VNode {
            const icon = createElement(MkrIcon, {
                  props: { name: this.name },
                });

                return createElement(this.component, {
                  class: this.classes,
                  attrs: { ...this.$attrs },
                  on: {
                    click: this.click,
                  },
                }, [icon, this.$slots.default]);
        }
    },
    props: {
        name: { type: String, required: true },
        theme: {
                default: 'light',
                type: String,
                validator: (theme: string) => Object.values(interactiveIconThemes).includes(theme),
              },
        activated: { default: false, type: Boolean }
    }
})
