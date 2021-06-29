import { MkrCard } from "../../../mikado_reborn/src/components";
import { radius } from "../../../mikado_reborn/src/components/Card/Card.vue";

export default {
  title: 'Components/Card',
  component: MkrCard,
  argTypes: {
    radius: {
      options: Object.values(radius),
      control: {
        type: 'radio',
      }
    }
  },
};

const Template = (args) => ({
  props: Object.keys(args),
  template: '<mkr-card v-bind="$props">Im a Card</mkr-card>',
});

export const Card = Template.bind({});
Card.args = {
  elevated: true,
  bordered: true,
};
