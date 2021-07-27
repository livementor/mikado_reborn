import { MkrNotificationBadge } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/NotificationBadge',
  component: MkrNotificationBadge,
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
  <div>
    <mkr-notification-badge v-bind="$props">
      <mkr-icon name="mail" style="margin-right:10px;"/>
    </mkr-notification-badge>
    <mkr-notification-badge v-bind="$props">
      <mkr-icon name="paper-airplane"/>
    </mkr-notification-badge>
  </div>`,
});

export const NotificationBadge = Template.bind({});
NotificationBadge.args = {
  show: true,
}
