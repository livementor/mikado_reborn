import { MkrSnackbar } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Snackbar',
  component: MkrSnackbar,
  argTypes: {

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-snackbar v-bind="$props" />',
});

export const ErrorSnackbar = Template.bind({});
ErrorSnackbar.args = {
  error: true,
  message: 'Error Message',
  timeout: 0,
};

export const SuccessSnackbar = Template.bind({});
SuccessSnackbar.args = {
  success: true,
  message: 'Success Message',
  timeout: 0,
};

export const NeutralSnackbar = Template.bind({});
NeutralSnackbar.args = {
  neutral: true,
  message: 'Neutral Message',
  timeout: 0,
};

export const NeutralSnackbarWithClose = Template.bind({});
NeutralSnackbarWithClose.args = {
  neutral: true,
  message: 'Neutral Message',
  closable: true,
  timeout: 0,
};
