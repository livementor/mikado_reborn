import { MkrBackDrop } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/BackDrop',
  component: MkrBackDrop,
  argTypes: {

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-backdrop v-bind="$props" />',
});

export const BackDrop = Template.bind({});
BackDrop.args = {

};
