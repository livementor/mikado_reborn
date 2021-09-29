import { MkrModal } from '../../../mikado_reborn/src/components';
import { sizes } from '../../../mikado_reborn/src/components/Modal/Modal.vue';
import { MkrContainedButton } from '../../../mikado_reborn/src/components';
import { MkrTextarea } from '../../../mikado_reborn/src/components';
import { MkrTextfield } from '../../../mikado_reborn/src/components';
import { MkrDropdown } from '../../../mikado_reborn/src/components';

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
    selectModel: 'option1',
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
      <div style="display: flex; flex-direction: column">
          <h1>Form</h1>

          <div style="margin: 15px 0;">
            <label>Input label</label>
            <mkr-textfield type="text" />
          </div>

          <div>
            <label>Textarea label</label>
            <mkr-textarea></mkr-textarea>
          </div>

          <div style="margin: 15px 0;">
            <label>Select label</label>
            <mkr-dropdown v-model="selectModel" :items="['option1', 'option2']" />
          </div>

          <mkr-contained-button>Button</mkr-contained-button>
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
