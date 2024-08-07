import { defineComponent, computed, h } from 'vue';
import { MkrIcon } from '../../components/Icon';
import './Button.scss';

export default defineComponent({
  components: {
    MkrIcon,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (size: string) => ['small', 'medium', 'large'].includes(size),
    },
    icon: {
      type: String,
      default: undefined,
    },
    iconSide: {
      type: String,
      default: 'left',
      validator: (side: string) => ['left', 'right'].includes(side),
    },
  },
  setup(props, { slots, emit, attrs }) {
    const classBase = 'mkr__button';
    const hasContent = computed(() => Boolean(slots.default?.().length));

    const classes = computed(() => {
      const staticClasses = [classBase, `${classBase}--${props.size}`];
      if (!hasContent.value) staticClasses.push(`${classBase}--icon-only`);
      return staticClasses;
    });

    const isRouterLink = computed(() => !!attrs.to);
    const isLink = computed(() => !!attrs.href);

    const component = computed(() => {
      if (isRouterLink.value) {
        return 'RouterLink';
      }
      if (isLink.value) {
        return 'a';
      }
      return 'button';
    });

    const click = (event: Event) => {
      emit('click', event);
    };

    return () => {
      const content = slots.default ? slots.default() : [];
      if (props.icon) {
        const icon = h(MkrIcon, {
          props: { name: props.icon },
          class: `${classBase}__icon--${props.iconSide}`,
        });
        if (props.iconSide === 'left') {
          content.unshift(icon);
        } else {
          content.push(icon);
        }
      }
      return h(component.value, {
        class: classes.value,
        attrs: {
          ...attrs,
          disabled: props.disabled,
        },
        on: {
          click,
        },
      }, content);
    };
  },
});
