import { MkrIcon } from "../../../mikado_reborn/src/components";
import colors from '../../../mikado_reborn/src/utils/colors';
import icons from '../../../mikado_reborn/src/utils/icons';

export default {
  title: 'Components/Icon',
  component: MkrIcon,
  argTypes: {
    color: { control: { type: 'select', options: colors } },
    name: { control: { type: 'select', options: icons } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-icon v-bind="$props"/>',
});

export const Icon = Template.bind({});
Icon.args = {
  color: 'primary',
  name: icons[0],
};
