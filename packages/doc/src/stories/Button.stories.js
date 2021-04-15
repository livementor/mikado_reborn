import { MkrButton } from '../../../mikado_reborn/src/components';
import icons from '../../../mikado_reborn/src/utils/icons';

export default {
  title: 'Components/Button',
  component: MkrButton,
  argTypes: {
    variant: { control: { type: 'select', options: ['primary', 'secondary', 'outlined'] } },
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
  variant: 'primary',
  size: 'medium',
};

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
  variant: 'primary--light',
  size: 'medium',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  size: 'medium',
};

export const SecondaryLight = Template.bind({});
SecondaryLight.args = {
  variant: 'secondary--light',
  size: 'medium',
};

export const DangerLight = Template.bind({});
DangerLight.args = {
  variant: 'danger--light',
  size: 'medium',
};

export const SmallPrimary = Template.bind({});
SmallPrimary.args = {
  variant: 'primary',
  size: 'small',
};

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
  variant: 'primary',
  size: 'medium',
  icon: 'chat',
};

export const SecondaryWithIcon = Template.bind({});
SecondaryWithIcon.args = {
  variant: 'secondary',
  size: 'medium',
  icon: 'chat',
};

export const SmallPrimaryWithIcon = Template.bind({});
SmallPrimaryWithIcon.args = {
  variant: 'primary',
  size: 'small',
  icon: 'chat',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  size: 'medium',
};

export const SmallOutlined = Template.bind({});
SmallOutlined.args = {
  variant: 'outlined',
  size: 'small',
};

export const OutlinedWithIcon = Template.bind({});
OutlinedWithIcon.args = {
  variant: 'outlined',
  size: 'small',
  icon: 'chat'
};
