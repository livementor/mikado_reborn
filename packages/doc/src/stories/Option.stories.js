import { MkrOption, MkrOptionGroup } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Option',
  component: MkrOptionGroup,
  subcomponents: { MkrOption },
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
  <mkr-option-group v-bind="$props">
    <mkr-option />
    <mkr-option />
  </mkr-option-group>
  `,
});

export const OptionGroup = Template.bind({});
OptionGroup.args = {
  name: 'Hello',
};
