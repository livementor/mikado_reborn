import { MkrTextButton } from '../../../../mikado_reborn/src/components';
import icons from '../../../../mikado_reborn/src/utils/icons';
import { textButtonThemes } from '../../../../mikado_reborn/src/components/Button/Text/TextButton';

export default {
  title: 'Components/Button/TextButton',
  component: MkrTextButton,
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: Object.keys(textButtonThemes),
      },
    },
    size: { control: { type: 'select', options: ['medium', 'small'] } },
    icon: { control: { type: 'select', options: icons } },
    iconSide: { control: { type: 'select', options: ['left', 'right'] } },
  },
};

const TextButtonTemplate = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<mkr-text-button v-bind="$props">Label</mkr-text-button>`,
});

export const TextButton = TextButtonTemplate.bind({});
TextButton.args = {
  size: 'medium',
  icon: 'chat',
  iconSide: 'left',
  disabled: false,
  activated: false,
};

const TextButtonShowcaseTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<div style="display: flex; justify-content: space-around;">
    <mkr-text-button v-bind="$props">Label</mkr-text-button>
    <mkr-text-button v-bind="$props" icon="chat">Label</mkr-text-button>
    <mkr-text-button v-bind="$props" icon="chat" />
    <mkr-text-button v-bind="$props" icon="chat" activated>Label</mkr-text-button>
  </div>`,
});

export const TextButtonNeutral = TextButtonShowcaseTemplate.bind({});
TextButtonNeutral.args = {
  size: 'medium',
};

export const TextButtonSmall = TextButtonShowcaseTemplate.bind({});
TextButtonSmall.args = {
  size: 'small',
};

const TextButtonLinkTemplate = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<mkr-text-button href="https://www.google.com" target="_blank" v-bind="$props">Label</mkr-text-button>`,
});

export const TextButtonLink = TextButtonLinkTemplate.bind({});
