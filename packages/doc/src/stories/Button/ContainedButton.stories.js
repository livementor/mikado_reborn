import { MkrContainedButton } from '../../../../mikado_reborn/src/components';
import icons from '../../../../mikado_reborn/src/utils/icons';

export default {
  title: 'Components/Button/ContainedButton',
  component: MkrContainedButton,
  argTypes: {
    theme: {
      control: {
        type: 'select', options: [
          'primary',
          'primary-light',
          'secondary',
          'secondary-light',
          'danger-light',
          'neutral'
        ],
      }
    },
    size: { control: { type: 'select', options: ['medium', 'small'] } },
    icon: { control: { type: 'select', options: icons } },
    iconSide: { control: { type: 'select', options: ['left', 'right'] } },
  },
};

const ContainedButtonTemplate = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<mkr-contained-button v-bind="$props">Label</mkr-contained-button>`,
});

export const ContainedButton = ContainedButtonTemplate.bind({});
ContainedButton.args = {
  theme: 'primary',
  size: 'medium',
  icon: 'chat',
  iconSide: 'left',
  disabled: false,
};


const ContainedButtonShowcaseTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<div style="display: flex; justify-content: space-around;">
    <mkr-contained-button v-bind="$props">Label</mkr-contained-button>
    <mkr-contained-button v-bind="$props" icon="chat">Label</mkr-contained-button>
    <mkr-contained-button v-bind="$props" icon="chat"></mkr-contained-button>
  </div>`,
});

export const ContainedButtonPrimary = ContainedButtonShowcaseTemplate.bind({});
ContainedButtonPrimary.args = {
  theme: 'primary',
  size: 'medium',
};

export const ContainedButtonSecondary = ContainedButtonShowcaseTemplate.bind({});
ContainedButtonSecondary.args = {
  theme: 'secondary',
  size: 'medium',
};

export const ContainedButtonPrimaryLight = ContainedButtonShowcaseTemplate.bind({});
ContainedButtonPrimaryLight.args = {
  theme: 'primary-light',
  size: 'medium',
};

export const ContainedButtonSmall = ContainedButtonShowcaseTemplate.bind({});
ContainedButtonSmall.args = {
  theme: 'primary',
  size: 'small',
};

const ContainedButtonLinkTemplate = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<mkr-contained-button href="https://www.google.com" target="_blank" v-bind="$props">Label</mkr-contained-button>`,
});

export const ContainedButtonLink = ContainedButtonLinkTemplate.bind({});
