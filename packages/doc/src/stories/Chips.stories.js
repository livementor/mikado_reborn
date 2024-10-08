import { MkrChips, MkrChipsList } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Chips',
  component: MkrChipsList,
  subcomponents: {
    'Chips': MkrChips,
  },
  argTypes: {
    size: { control: 'select', options: ['medium', 'small'] },
    orientation: { control: 'select', options: ['row', 'column'] },
    wrap: { control: { type: 'boolean' }, defaultValue: { summary: 'false' } },
    value: {
      control: false,
    }
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    gender: null,
  }),
  template: `
  <div>
    <mkr-chips-list v-bind="$props" v-model="gender">
      <mkr-chips label="Femme" value="woman"/>
      <mkr-chips label="Homme" value="man"/>
      <mkr-chips label="Non binaire" value="nonbinary"/>
    </mkr-chips-list>
  </div>`,
});

export const ChipsList = Template.bind({});
ChipsList.args = {
  size: 'medium',
  orientation: 'row',
  wrap: true,
};
