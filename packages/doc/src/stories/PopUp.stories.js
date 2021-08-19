import { MkrPopUp } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/PopUp',
  component: MkrPopUp,
};

const Template = (args) => ({
  props: Object.keys(args),
  data: () => ({
    showPopup: true,
  }),
  template: `
    <div style="height:200px;display:flex;align-items:center;justify-content: center;">
      <mkr-pop-up v-bind="$props" v-model="showPopup" :dismissable="this.dismissable">
        <template v-slot:anchor>
          <mkr-contained-button>button</mkr-contained-button>
        </template>
        <mkr-card :elevated="true" style="padding: 16px;">
          <span class="body-caption-font" style="margin: 16px;">un text de test</span>
          <mkr-contained-button style="margin: auto;">test</mkr-contained-button>
        </mkr-card>
      </mkr-pop-up>
    </div>
  `,
});

export const PopUp = Template.bind({});
PopUp.args = {
  dismissable: false,
};
