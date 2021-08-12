import { VNodeData, VNode, CreateElement } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MkrIcon from '../Icon/Icon.vue';
import './InteractiveIcon.scss';

export const interactiveIconThemes = {
  light: 'light',
  dark: 'dark',
  danger: 'danger',
};

@Component({
  components: {
    MkrIcon,
  },
})
export default class Icon extends Vue {
  @Prop({ type: String, required: true }) private name!: string;

  @Prop({
    default: 'light',
    type: String,
    validator: (theme) => Object.values(interactiveIconThemes).includes(theme),
  })
  theme!: string;

  @Prop({ default: false, type: Boolean })
  activated!: boolean;

  @Prop({ type: Boolean, default: false })
  linkify!: boolean;

  class = 'mkr__interactive-icon';

  get classes(): VNodeData['class'] {
    return [
      this.class,
      `${this.class}--${this.theme}`,
      {
        [`${this.class}--${this.theme}--activated`]: this.activated,
      },
    ];
  }

  click(event: Event): void {
    this.$emit('click', event);
  }

  render(createElement: CreateElement): VNode {
    const icon = createElement(MkrIcon, {
      props: { name: this.name },
    });

    return createElement(
      this.linkify ? 'a' : 'button',
      {
        class: this.classes,
        on: {
          click: this.click,
        },
      },
      [icon, this.$slots.default]
    );
  }
}
