import { MkrCard } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Card',
  component: MkrCard,
  argTypes: {

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-card style="height: 100px; display:flex;" v-bind="$props" ><mkr-button style="margin:auto;" v-bind="primary">Hello</mkr-button></mkr-card>',
});

export const Card = Template.bind({});
Card.args = {
  bordered: false
};

export const CardBordered = Template.bind({});
CardBordered.args = {
  bordered: true
};
