import { MkrOutlinedButton } from '../../../../mikado_reborn/src/components';
import icons from '../../../../mikado_reborn/src/utils/icons';

export default {
  title: 'Components/Button/OutlinedButton',
  component: MkrOutlinedButton,
  argTypes: {
    size: { control: { type: 'select', options: ['medium', 'small'] } },
    icon: { control: { type: 'select', options: icons } },
    iconSide: { control: { type: 'select', options: ['left', 'right'] } },
  },
};

const OutlinedButtonTemplate = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<mkr-outlined-button v-bind="$props">Label</mkr-outlined-button>`,
});

export const OutlinedButton = OutlinedButtonTemplate.bind({});
OutlinedButton.args = {
  size: 'medium',
  icon: 'chat',
  iconSide: 'left',
  disabled: false,
};


const OutlinedButtonShowcaseTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<div style="display: flex; justify-content: space-around;">
    <mkr-outlined-button v-bind="$props">Label</mkr-outlined-button>
    <mkr-outlined-button v-bind="$props" icon="chat">Label</mkr-outlined-button>
    <mkr-outlined-button v-bind="$props" icon="chat" />
  </div>`,
});

export const OutlinedButtonMedium = OutlinedButtonShowcaseTemplate.bind({});
OutlinedButtonMedium.args = {
  size: 'medium',
};

export const OutlinedButtonSmall = OutlinedButtonShowcaseTemplate.bind({});
OutlinedButtonSmall.args = {
  size: 'small',
};