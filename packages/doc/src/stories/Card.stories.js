import { MkrCard } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Card',
  component: MkrCard,
  argTypes: {

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-card style="height: 100px;" v-bind="$props" />',
});

export const Card = Template.bind({});
Card.args = {
  bordered: false
};

export const CardBordered = Template.bind({});
CardBordered.args = {
  bordered: true
};
