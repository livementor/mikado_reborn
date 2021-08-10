import { MkrExpansionPanel } from '../../../mikado_reborn/src/components';

export default {
  title: 'Components/ExpansionPanel',
  component: MkrExpansionPanel,
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `<mkr-expansion-panel v-bind="$props">
  <template #header="{expanded}">Header {{ expanded ? 'expanded' : 'collapsed' }}</template>
  <template #content>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus tortor semper faucibus scelerisque dignissim ipsum. Feugiat senectus dui non in morbi congue quis consectetur vitae. Non ac at rhoncus, turpis amet, faucibus diam commodo, dui. Massa amet morbi arcu, fringilla eu commodo sit. Viverra lobortis lacus rutrum nibh velit. Sapien nisl, mauris tellus luctus netus diam. Quisque enim, dictumst diam at suscipit mattis consectetur imperdiet.
  </template>
  </mkr-expansion-panel>`,
});

export const ExpansionPanel = Template.bind({});
ExpansionPanel.args = {
  defaultExpanded: false,
};

export const ExpansionPanelExpanded = Template.bind({});
ExpansionPanelExpanded.args = {
  defaultExpanded: true,
};
