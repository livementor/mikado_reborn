import { MkrPopUp } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/PopUp',
  component: MkrPopUp,
  argTypes: {

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-pop-up v-bind="$props"><template v-slot:anchor><mkr-contained-button>button</mkr-contained-button></template><mkr-card :elevated="true"><mkr-contained-button>test</mkr-contained-button></mkr-card></mkr-pop-up>',
});

export const PopUp = Template.bind({});
PopUp.args = {

};