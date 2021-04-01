import { MkrAvatar } from "../../../mikado_reborn/src/components";

export default {
  title: 'Example/Avatar',
  component: MkrAvatar,
  argTypes: {
    url: { control: { type: 'text' } },
    alt: { control: { type: 'text' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-avatar v-bind="$props" />',
});

export const Avatar = Template.bind({});
Avatar.args = {
  url: 'https://randomuser.me/api/portraits/men/34.jpg',
  alt: 'Reginald Hughes',
};
