import { MkrSlider } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Slider',
  component: MkrSlider,
  argTypes: {

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-slider v-bind="$props"/>',
});

export const Slider = Template.bind({});
Slider.args = {
  value: 50
};
