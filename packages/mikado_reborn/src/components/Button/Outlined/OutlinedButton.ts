import Button from '../../../mixins/Button/Button';
import './OutlinedButton.scss';
import { defineComponent } from 'vue';

export default defineComponent({
  extends: Button,
  computed: {
    classes(): Button['classes'] {
      const componentClass = `${this.class}--outlined`;
      return [
        componentClass,

      ];
    },
  },
});
