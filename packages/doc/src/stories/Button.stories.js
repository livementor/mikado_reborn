import { MkrButton } from '../../../mikado_reborn/src/components';

export default {
  title: 'Components/Button',
  component: MkrButton,
  argTypes: {
    type: { control: { type: 'select', options: ['primary', 'secondary'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-button v-bind="$props">Hello</mkr-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
};
