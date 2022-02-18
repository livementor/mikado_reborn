import { MkrProgressbar } from '../../../mikado_reborn/src/components';

export default {
  title: 'Components/Progressbar',
  component: MkrProgressbar,
};

const Template = (args) => ({
  props: Object.keys(args),
  template:
    '<div style="width: 200px;"><mkr-progressbar v-bind="$props" /></div>',
});

export const Progressbar = Template.bind({});
Progressbar.args = {
  total: 4,
  current: 1,
  shrinkEmoji: false,
};

const WithSlotTemplate = (args) => ({
  props: Object.keys(args),
  template:
    '<div style="width: 200px;"><mkr-progressbar v-bind="$props">🎉</mkr-progressbar></div>',
});

export const ProgressbarWithSlot = WithSlotTemplate.bind({});
ProgressbarWithSlot.args = {
  total: 4,
  current: 1,
  shrinkEmoji: false,
};
