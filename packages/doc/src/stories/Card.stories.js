import { MkrCard } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Card',
  component: MkrCard,
};

const Template = (args) => ({
  props: Object.keys(args),
  template: '<mkr-card v-bind="$props">Im a Card</mkr-card>',
});

export const Card = Template.bind({});
Card.args = {
  elevated: true,
};
