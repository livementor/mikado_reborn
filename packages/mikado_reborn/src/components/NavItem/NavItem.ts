import { CreateElement, VNode } from 'vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MkrIcon } from '../Icon';
import { MkrTooltip } from '../Tooltip';

import './NavItem.scss';

@Component({
  components: {
    MkrIcon,
    MkrTooltip,
  },
  inheritAttrs: false,
})
export default class NavItem extends Vue {
  @Prop({ type: Boolean, default: false })
  active!: boolean;

  @Prop({ type: String, default: undefined })
  title?: string;

  @Prop({ type: String, default: undefined })
  icon?: string;

  get classes(): (string | { [className: string]: boolean; })[] {
    return [
      'mkr__nav-item',
      {
        'mkr__nav-item--icon-only': !this.hasContent,
        'mkr__nav-item--active': this.active,
      },
    ];
  }

  get hasContent(): boolean {
    return Boolean(this.$slots.default?.length);
  }

  get isRouterLink(): boolean {
    return !!this.$attrs.to;
  }

  get component(): string {
    if (this.isRouterLink) {
      return 'RouterLink';
    }

    return 'a';
  }

  /**
   * Passthrough click event
   */
  emitClick(event: MouseEvent): void {
    this.$emit('click', event);
  }

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
        class: { ...this.classes },
      },
      [
        (this.title)
          ? createElement(MkrTooltip, { props: { label: this.title } }, [link])
          : link,
      ],
    );

    return item;
  }
}
