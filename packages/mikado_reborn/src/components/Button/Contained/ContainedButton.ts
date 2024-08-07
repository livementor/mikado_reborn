import { defineComponent, PropType } from 'vue';
import Button from '../../../mixins/Button/Button';
import './ContainedButton.scss';

export const containedButtonThemes = {
  primary: 'primary',
  'primary-light': 'primary-light',
  secondary: 'secondary',
  'secondary-light': 'secondary-light',
  'danger-light': 'danger-light',
  neutral: 'neutral',
};

export default defineComponent({
  extends: Button,
  computed: {
    classes(): typeof Button['classes'] {
      const componentClass = `${this.class}--contained`;
      return [
        componentClass,
        `${componentClass}--${this.theme}`,
      ];
    },
  },
  props: {
    theme: {
      default: 'primary',
      validator: (theme: string) => Object.keys(containedButtonThemes).includes(theme),
      type: String as PropType<keyof typeof containedButtonThemes>,
    },
  },
});
