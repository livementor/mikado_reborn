import { MkrButton } from '../../../mikado_reborn/src/components';

export default {
  title: 'Components/Button',
  component: MkrButton,
  argTypes: {
    type: { control: { type: 'select', options: ['primary', 'secondary'] } },
    size: { control: { type: 'select', options: ['medium', 'small'] } },
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
