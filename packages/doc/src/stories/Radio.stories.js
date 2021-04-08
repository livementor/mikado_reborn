import { MkrRadio, MkrRadioGroup } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Radio',
  component: MkrRadioGroup,
  subcomponents: { 'Radio': MkrRadio },
};

const Template = (args) => ({
  props: Object.keys(args),
  data: () => ({
    value: 'pepper',
  }),
  template: `
  <div>
    <mkr-radio-group v-bind="$props" v-model="value">
      <mkr-radio label="Du sel" value="salt"/>
      <mkr-radio label="Du poivre" value="pepper"/>
    </mkr-radio-group>
    <code>{{value}}</code>
    <button @click="value='salt'">change</button>
  </div>
  `,
});

export const RadioGroup = Template.bind({});
RadioGroup.args = {
  name: 'Hello',
};
