import { MkrSteppedProgress } from "../../../mikado_reborn/src/components";
import colors from '../../../mikado_reborn/src/utils/colors';

export default {
  title: 'Components/SteppedProgress',
  component: MkrSteppedProgress,
  argTypes: {
    color: { control: { type: 'select', options: colors } },
    backgroundColor: { control: { type: 'select', options: colors } },
  }
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  template: '<mkr-stepped-progress v-bind="$props" />',
});

export const SteppedProgress = Template.bind({});
SteppedProgress.args = {
  steps: 4,
  progress: 0,
  color: 'primary',
};
