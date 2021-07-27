import { MkrProgressbar } from '../../../mikado_reborn/src/components';

export default {
  title: 'Components/Progressbar',
  component: MkrProgressbar,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-progressbar v-bind="$props" />',
});

export const Progressbar = Template.bind({});
Progressbar.args = {
  totalSteps: 4,
  currentStep: 1,
};
