import { MkrCard } from "../../../mikado_reborn/src/components";
import { radiusType } from "../../../mikado_reborn/src/components/Card/Card.vue";

export default {
  title: 'Components/Card',
  component: MkrCard,
  argTypes: {
    radius: {
      options: ['small', 'medium', 'large'],
      control: {
        type: 'radio',
      }
    }
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-card v-bind="$props">Im a Card</mkr-card>',
});

export const Card = Template.bind({});
Card.args = {
  elevated: true,
  bordered: true,
};
