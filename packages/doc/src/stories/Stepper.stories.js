import { MkrStepper } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Stepper',
  component: MkrStepper,
  argTypes: {

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <mkr-stepper v-bind="$props">
    <template #step_1>
      <div>Step 1</div>
    </template>
    <template #step_2>
      <div>Step 2</div>
    </template>
    <template #step_3>
      <div>Step 3</div>
    </template>
    <template #step_4>
      <div>Step 4</div>
    </template>
  </mkr-stepper>
  `,
});

export const Stepper = Template.bind({});
Stepper.args = {
  items: ['Formation', 'Paiement', 'Contrat', 'Confirmation'],
  step: 1,
};
