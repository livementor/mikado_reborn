import { MkrButton } from '../../../mikado_reborn/src/components';
import icons from '../../../mikado_reborn/src/utils/icons';

export default {
  title: 'Components/Button',
  component: MkrButton,
  argTypes: {
    type: { control: { type: 'select', options: ['primary', 'secondary', 'outlined'] } },
    size: { control: { type: 'select', options: ['medium', 'small'] } },
    icon: { control: { type: 'select', options: icons } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-button v-bind="$props">Hello</mkr-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  size: 'medium',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  size: 'medium',
};

export const SmallPrimary = Template.bind({});
SmallPrimary.args = {
  type: 'primary',
  size: 'small',
};

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
  type: 'primary',
  size: 'medium',
  icon: 'chat',
};

export const SecondaryWithIcon = Template.bind({});
SecondaryWithIcon.args = {
  type: 'secondary',
  size: 'medium',
  icon: 'chat',
};

export const SmallPrimaryWithIcon = Template.bind({});
SmallPrimaryWithIcon.args = {
  type: 'primary',
  size: 'small',
  icon: 'chat',
};

export const Outlined = Template.bind({});
Outlined.args = {
  type: 'outlined',
  size: 'medium',
};

export const SmallOutlined = Template.bind({});
SmallOutlined.args = {
  type: 'outlined',
  size: 'small',
};

export const OutlinedWithIcon = Template.bind({});
OutlinedWithIcon.args = {
  type: 'outlined',
  size: 'small',
  icon: 'chat'
};
