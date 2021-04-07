import { MkrButton } from "../../../mikado_reborn/src/components";
import colors from '../../../mikado_reborn/src/utils/colors';

export default {
  title: 'Components/Button',
  component: MkrButton,
  argTypes: {
    color: { control: { type: 'select', options: colors } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-button v-bind="$props">Hello</mkr-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};
