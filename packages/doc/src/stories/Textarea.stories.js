import { MkrTextarea } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Textarea',
  component: MkrTextarea,
  argTypes: {

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-textarea v-bind="$props" />',
});

export const Textarea = Template.bind({});
Textarea.args = {
  minlength: 0,
  maxlength: 100,
  placeholder: 'My placeholder area',
};
