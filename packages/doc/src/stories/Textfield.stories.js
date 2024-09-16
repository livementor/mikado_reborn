import { MkrTextfield } from "../../../mikado_reborn/src/components";
import icons from '../../../mikado_reborn/src/utils/icons';

export default {
  title: 'Components/Textfield',
  component: MkrTextfield,
  argTypes: {
    type: { control: { type: 'select', options: ['text', 'email', 'password', 'date'] } },
    iconName: { control: { type: 'select', options: icons } },
  },
};

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-textfield v-bind="$props"/>',
});

export const TextField = Template.bind({});
TextField.args = {
  placeholder: "My awesome placeholder",
  type: "text",
  error: false,
}

export const TextFieldWithIcon = Template.bind({});
TextFieldWithIcon.args = {
  placeholder: "My awesome placeholder with icon",
  type: "text",
  error: false,
  iconName:"chat"
}
