import { MkrBadge } from "../../../mikado_reborn/src/components";
import { badgeType } from '../../../mikado_reborn/src/components/Badge/Badge.vue';

export default {
  title: 'Components/Badge',
  component: MkrBadge,
  argTypes: {
    type: { control: { type:'select', options: badgeType } }
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-badge v-bind="$props" >{{ slot }}</mkr-badge>',
});

export const BadgeDanger = Template.bind({});
BadgeDanger.args = {
  type: 'danger',
  slot: 'warning',
};

export const BadgeSuccess = Template.bind({});
BadgeSuccess.args = {
  type: 'success',
  slot: 'success',
};
