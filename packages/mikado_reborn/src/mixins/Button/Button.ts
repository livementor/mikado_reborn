import {
  CreateElement, VNode, VNodeChildren, VNodeData,
} from 'vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MkrIcon } from '../../components/Icon';
import './Button.scss';

@Component({
  components: {
    MkrIcon,
  },
})
export default class Button extends Vue {
  @Prop({ default: false })
  disabled!: boolean;

  @Prop({
    default: 'medium',
    validator: (size) => ['small', 'medium', 'large'].includes(size),
  })
  size!: 'small' | 'medium' | 'large';

  @Prop({ default: undefined })
  icon?: string;

  @Prop({
    default: 'left',
    validator: (side) => ['left', 'right'].includes(side),
  })
  iconSide!: 'left' | 'right';

  @Prop({ type: Boolean, default: false })
  linkify!: boolean;

  class = 'mkr__button';

  // eslint-disable-next-line class-methods-use-this
  get classes(): VNodeData['class'] {
    return {};
  }

  private get hasContent(): boolean {
    return Boolean(this.$slots.default?.length);
  }

  click(event: Event): void {
    this.$emit('click', event);
  }

  render(createElement: CreateElement): VNode {
    const staticClasses = [this.class];
    let content: VNodeChildren = [this.$slots.default];

    staticClasses.push(`${this.class}--${this.size}`);

    if (!this.hasContent) staticClasses.push(`${this.class}--icon-only`);

    if (this.icon) {
      const icon = createElement(MkrIcon, {
        props: { name: this.icon },
        staticClass: `${this.class}__icon--${this.iconSide}`,
      });
      content = this.iconSide === 'left' ? [icon, ...content] : [...content, icon];
    }

    return createElement(this.linkify ? 'a' : 'button', {
      staticClass: staticClasses.join(' '),
      class: this.classes,
      attrs: {
        disabled: this.disabled,
      },
      on: {
        click: this.click,
      },
    }, content);
  }
}
