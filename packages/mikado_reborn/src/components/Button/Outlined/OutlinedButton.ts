import { Component } from 'vue-property-decorator';
import Button from '../../../mixins/Button/Button';
import './OutlinedButton.scss';

@Component
export default class OutlinedButton extends Button {
  get classes(): Button['classes'] {
    const componentClass = `${this.class}--outlined`;
    return [
      componentClass,
    ];
  }
}
