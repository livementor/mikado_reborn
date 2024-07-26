import { Component, Prop } from 'vue-property-decorator';
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

@Component
export default class ContainedButton extends Button {
  @Prop({
    default: 'primary',
    validator: (theme: string) => Object.keys(containedButtonThemes).includes(theme),
  })
  theme!: keyof typeof containedButtonThemes;

  get classes(): Button['classes'] {
    const componentClass = `${this.class}--contained`;
    return [
      componentClass,
      `${componentClass}--${this.theme}`,
    ];
  }
}
