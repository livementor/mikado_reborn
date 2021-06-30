import { MkrDataTable } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/DataTable',
  component: MkrDataTable,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-data-table v-bind="$props" />'
});

export const DataTable = Template.bind({});
DataTable.args = {
  title: 'Formations',
  columns: [
    {
      label: 'Début',
      value: 'startDate',
    },
    {
      label: 'Fin',
      value: 'endDate',
    },
    {
      label: 'Formation',
      value: 'formation',
    }
  ],
  items: [
    {
      startDate: '12/02/2019',
      endDate: '13/05/2019',
      formation: 'Nom de la formation'
    },
    {
      startDate: '08/01/2020',
      endDate: '12/04/2020',
      formation: 'Nom de la formation'
    }
  ]
};
