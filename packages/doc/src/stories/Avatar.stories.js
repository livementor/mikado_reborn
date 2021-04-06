import { MkrAvatar } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Avatar',
  component: MkrAvatar,
  argTypes: {
    src: { control: { type: 'text' } },
    alt: { control: { type: 'text' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-avatar v-bind="$props" />',
});

export const Avatar = Template.bind({});
Avatar.args = {
  src: 'https://randomuser.me/api/portraits/men/34.jpg',
  alt: 'Reginald Hughes',
};
