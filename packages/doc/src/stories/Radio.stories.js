import { MkrRadio, MkrRadioGroup } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Radio',
  component: MkrRadioGroup,
  subcomponents: { 'Radio': MkrRadio },
};

const Template = (args) => ({
  props: Object.keys(args),
  data: () => ({
    gender: 'nonbinary',
  }),
  template: `
    <mkr-radio-group v-bind="$props" v-model="gender">
      <mkr-radio label="Femme" value="woman"/>
      <mkr-radio label="Homme" value="man"/>
      <mkr-radio label="Non binaire" value="nonbinary"/>
    </mkr-radio-group>
  `,
});

export const RadioGroup = Template.bind({});
RadioGroup.args = {
  name: 'gender',
};
