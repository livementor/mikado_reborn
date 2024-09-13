import { MkrBadge } from "../../../mikado_reborn/src/components";
import { badgeType } from '../../../mikado_reborn/src/components/Badge/Badge.vue';

export default {
  title: 'Components/Badge',
  component: MkrBadge,
  argTypes: {
    type: { control: {
      type:'select',
      options: ['danger', 'danger-light', 'info', 'info-light', 'primary', 'primary-light', 'secondary', 'success', 'success-light', 'warning-light', 'other-1']
    } }
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-badge v-bind="$props" >{{ text }}</mkr-badge>',
});

export const BadgeDanger = Template.bind({});
BadgeDanger.args = {
  type: 'danger',
  text: 'warning',
};

export const BadgeSuccess = Template.bind({});
BadgeSuccess.args = {
  type: 'success',
  text: 'success',
};
