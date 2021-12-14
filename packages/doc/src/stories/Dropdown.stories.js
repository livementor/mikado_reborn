import { MkrDropdown } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Dropdown',
  component: MkrDropdown,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(args),
  data: () => ({
    value: '',
  }),
  template: '<mkr-dropdown v-bind="$props" v-model="value" />',
});

export const Dropdown = Template.bind({});
Dropdown.args = {
  items: [
    'Arabic',
    'Chinese',
    'Dutch',
    'English',
    'French',
    'German',
    'Italian',
    'Japanese',
    'Korean',
    'Spanish',
  ],
  placeholder: 'Please select your language',
};

export const DropdownWithCustomValues = Template.bind({});
DropdownWithCustomValues.args = {
  items: [
    { value: 'ar', label: 'Arabic' },
    { value: 'ch', label: 'Chinese' },
    { value: 'du', label: 'Dutch' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'ge', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'sp', label: 'Spanish' },
  ],
  placeholder: 'Please select your language',
};

export const DropdownWithCustomItems = Template.bind({});
DropdownWithCustomItems.args = {
  items: [
    { countryCode: 'ar', countryName: 'Arabic' },
    { countryCode: 'ch', countryName: 'Chinese' },
    { countryCode: 'du', countryName: 'Dutch' },
    { countryCode: 'en', countryName: 'English' },
    { countryCode: 'fr', countryName: 'French' },
    { countryCode: 'ge', countryName: 'German' },
    { countryCode: 'it', countryName: 'Italian' },
    { countryCode: 'ja', countryName: 'Japanese' },
    { countryCode: 'ko', countryName: 'Korean' },
    { countryCode: 'sp', countryName: 'Spanish' },
  ],
  placeholder: 'Please select your language',
  itemLabel: 'countryName',
  itemValue: 'countryCode',
};
