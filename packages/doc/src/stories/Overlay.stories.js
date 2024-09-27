import { MkrOverlay } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Overlay',
  component: MkrOverlay,
  argTypes: {
    color: {
      options: ['dark', 'light'],
      control: {
        type: 'select',
      }
    }
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    showOverlay: true,
  }),
  methods: {
    open () {
      this.showOverlay = true
    }
  },
  template: `
    <div>
      <mkr-contained-button @click="open">Open Overlay</mkr-contained-button>
      <mkr-overlay v-bind="$props" v-model="showOverlay" />
    </div>
  `,
});

export const Overlay = Template.bind({});
Overlay.args = {};
