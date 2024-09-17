import { MkrProgressbar } from '../../../mikado_reborn/src/components';

export default {
  title: 'Components/Progressbar',
  component: MkrProgressbar,
  argTypes: {
    size: { control: { type: 'select', options: ['medium', 'small'] } },
  }
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  template:
    '<div style="width: 200px;"><mkr-progressbar v-bind="$props" /></div>',
});

export const Progressbar = Template.bind({});
Progressbar.args = {
  total: 4,
  current: 1,
  shrinkEmoji: false,
};

const WithSlotTemplate = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  template:
    '<div style="width: 200px;"><mkr-progressbar v-bind="$props">🎉</mkr-progressbar></div>',
});

export const ProgressbarWithSlot = WithSlotTemplate.bind({});
ProgressbarWithSlot.args = {
  total: 4,
  current: 1,
  shrinkEmoji: false,
};

const simpleProgress = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  template:
    '<div style="width: 200px;"><mkr-progressbar v-bind="$props"></mkr-progressbar></div>',
});

export const SimpleProgress = simpleProgress.bind({});
SimpleProgress.args = {
  total: 4,
  current: 1,
  shrinkEmoji: true,
  hideState: true
};
