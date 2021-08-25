import { MkrToggle } from '../../../mikado_reborn/src/components';

export default {
  title: 'Components/Toggle',
  component: MkrToggle,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({ model: false }),
  template: '<mkr-toggle v-bind="$props" v-model="model" />',
});

export const Toggle = Template.bind({});
Toggle.args = {};
