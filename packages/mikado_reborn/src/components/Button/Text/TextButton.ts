import { Component, Prop } from 'vue-property-decorator';
import Button from '../../../mixins/Button/Button';
import './TextButton.scss';

export const textButtonThemes = {
  neutral: 'neutral',
  primary: 'primary',
  secondary: 'secondary',
  danger: 'danger',
};

@Component
export default class TextButton extends Button {
  @Prop({
    default: 'neutral',
    validator: (theme) => Object.keys(textButtonThemes).includes(theme),
  })
  theme!: keyof typeof textButtonThemes;

  @Prop({ default: false, type: Boolean })
  activated!: boolean;

  get classes(): Button['classes'] {
    const componentClass = `${this.class}--text`;
    return [
      componentClass,
      `${componentClass}--${this.theme}`,
      {
        [`${componentClass}--${this.theme}--activated`]: this.activated,
      },
    ];
  }
}
