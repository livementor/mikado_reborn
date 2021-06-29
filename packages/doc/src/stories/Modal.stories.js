import { MkrModal } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Modal',
  component: MkrModal,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    showModal: false,
    text: 'test',
  }),
  methods: {
    open () {
      this.showModal = true
    }
  },
  template: `
    <div>
      <mkr-modal v-bind="$props" v-model="showModal" >
        <p>I'm in the modal: {{ text }}</p>
        <input type="text" v-model="text"/>
      </mkr-modal>
      <button @click="open">Open</button>
      {{ showModal }}
      {{ text }}
      <input type="text" v-model="text"/>
    </div>
  `,
});

export const Modal = Template.bind({});
Modal.args = {};
