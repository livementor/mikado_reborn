import { MkrModal } from '../../../mikado_reborn/src/components';
import { sizes } from '../../../mikado_reborn/src/components/Modal/Modal.vue';

export default {
  title: 'Components/Modal',
  component: MkrModal,
  argTypes: {
    size: {
      options: Object.values(sizes),
      control: {
        type: 'select',
      },
    },
  },
};

const ModalTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    showModal: false,
  }),
  methods: {
    open() {
      this.showModal = true;
    },
  },
  template: `
    <div>
      <mkr-modal v-bind="$props" v-model="showModal" >
        <span>Hello World</span>
      </mkr-modal>
      <mkr-contained-button @click="open">Open Modal</mkr-contained-button>
    </div>
  `,
});

export const Modal = ModalTemplate.bind({});
Modal.args = {};

const ModalWithOverlayTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    showModal: false,
  }),
  methods: {
    open() {
      this.showModal = true;
    },
  },
  template: `
    <div>
      <mkr-overlay :opened="showModal" />
      <mkr-modal v-bind="$props" v-model="showModal">
      <div style="display: flex; flex-direction: column; align-items: start;">
          <h1>Hello world</h1>
          <input type="text" />
          <button>Button</button>
          <textarea></textarea>
          <select>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
      </mkr-modal>
      <mkr-contained-button @click="open">Open Modal</mkr-contained-button>
    </div>
  `,
});

export const ModalWithOverlay = ModalWithOverlayTemplate.bind({});
ModalWithOverlay.args = {};

export const UnclosableModal = ModalWithOverlayTemplate.bind({});
UnclosableModal.args = {
  closeable: false,
};
