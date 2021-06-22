import { MkrCheckbox } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Checkbox',
  component: MkrCheckbox,
  argTypes: {
    size: { control: { type: 'select', options: ['medium', 'small'] } },
  }
};

const Template = (args) => ({
  props: Object.keys(args),
  data: () => ({
    checked: true,
  }),
  template: `
    <mkr-checkbox v-bind="$props" v-model="checked" />
  `,
});

export const Checkbox = Template.bind({});
Checkbox.args = {
  size: 'medium'
};

export const CheckboxSmall = Template.bind({});
CheckboxSmall.args = {
  size: 'small'
};
