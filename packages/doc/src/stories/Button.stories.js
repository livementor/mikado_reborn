import { MkrButton } from "../../../mikado_reborn/src/components";

export default {
  title: 'Example/Button',
  component: MkrButton,
  argTypes: {
    label: { control: { type: 'text' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-button @onClick="onClick" v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};
