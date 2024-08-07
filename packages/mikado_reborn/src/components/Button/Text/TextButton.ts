import Button from '../../../mixins/Button/Button';
import './TextButton.scss';
import { defineComponent, PropType } from 'vue';

export const textButtonThemes = {
  neutral: 'neutral',
  'neutral-80': 'neutral-80',
  'neutral-60': 'neutral-60',
  'secondary-dark': 'secondary-dark',
  danger: 'danger',
};

export default defineComponent({
  extends: Button,
  computed: {
    classes(): Button['classes'] {
      const componentClass = `${this.class}--text`;
      return [
        componentClass,
        `${componentClass}--${this.theme}`,
        {
          [`${componentClass}--${this.theme}--activated`]: this.activated,
        },
      ];
    },
  },
  props: {
    theme: {
      default: 'neutral',
      validator: (theme: string) => Object.keys(textButtonThemes).includes(theme),
      type: Object as PropType<keyof typeof textButtonThemes>,
    },
    activated: { default: false, type: Boolean },
  },
});
