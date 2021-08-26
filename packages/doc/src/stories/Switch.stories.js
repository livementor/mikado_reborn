import { MkrSwitch } from '../../../mikado_reborn/src/components';

export default {
  title: 'Components/Switch',
  component: MkrSwitch,
};

const Template = () => ({
  data: () => ({ model: false }),
  template: '<mkr-switch v-bind="$props" v-model="model" />',
});

export const Switch = Template.bind({});
