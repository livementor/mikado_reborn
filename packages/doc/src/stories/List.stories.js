import { MkrList, MkrListItem } from "../../../mikado_reborn/src/components";
import { ListSize } from '../../../mikado_reborn/src/components/List/List.vue'

export default {
  title: 'Components/List',
  components: { MkrList },
  subcomponents: {
    MkrListItem,
  },
  argTypes: {
    itemHoverable: { control: { type: 'boolean' }, defaultValue: { summary: 'false' }, description: 'Apply CSS style on `<mkr-list-item />` on hover' },
    size: { options: [...Object.values(ListSize)], control: { type: 'inline-radio' }, defaultValue: { summary: 'medium' }, description: 'Size of list - Apply CSS style according with the chosen size' },
    clickable: { control: { type: 'boolean' }, defaultValue: { summary: 'false' }, description: 'Option of `<mkr-list-item />` to make the component a `<button />` clickable' },
  },
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
    <mkr-list :item-hoverable="$props.itemHoverable" :size="$props.size">
      <mkr-list-item>
        First
        <mkr-text-button icon="chat" size="small" style="margin-left: 3rem;" />
      </mkr-list-item>
      <mkr-list-item>
        Second
        <mkr-contained-button icon="download" size="small" style="margin-left: 3rem;">
          Télécharger
        </mkr-contained-button>
      </mkr-list-item>
      <mkr-list-item :clickable="$props.clickable"> Third </mkr-list-item>
      <mkr-list-item :clickable="$props.clickable"> Fourth </mkr-list-item>
    </mkr-list>
  `,
});
export const List = Template.bind({});
List.args = {
  itemHoverable: false,
  clickable: false,
  size: 'medium'
};

const ListHoverTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <mkr-list item-hoverable>
      <mkr-list-item>
        First
        <mkr-text-button icon="chat" size="small" style="margin-left: 3rem;" />
      </mkr-list-item>
      <mkr-list-item>
        Second
        <mkr-contained-button icon="download" size="small" style="margin-left: 3rem;">
          Télécharger
        </mkr-contained-button>
      </mkr-list-item>
      <mkr-list-item> Third </mkr-list-item>
      <mkr-list-item> Fourth </mkr-list-item>
    </mkr-list>
  `,
});
export const ListHover = ListHoverTemplate.bind({});

const ListItemsClickableTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <mkr-list>
      <mkr-list-item :clickable="true">
        First
      </mkr-list-item>
      <mkr-list-item :clickable="true">
        Second
      </mkr-list-item>
      <mkr-list-item :clickable="true"> Third </mkr-list-item>
      <mkr-list-item :clickable="true"> Fourth </mkr-list-item>
    </mkr-list>
  `,
});
export const ListItemsClickable = ListItemsClickableTemplate.bind({});

const ListSizeTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <mkr-list :size="$props.size">
      <mkr-list-item>
        First
      </mkr-list-item>
      <mkr-list-item>
        Second
      </mkr-list-item>
      <mkr-list-item> Third </mkr-list-item>
      <mkr-list-item> Fourth </mkr-list-item>
    </mkr-list>
  `,
});
export const ListSizeMedium = ListSizeTemplate.bind({});
ListSizeMedium.args = {
  size: 'medium'
}

export const ListSizeLarge = ListSizeTemplate.bind({});
ListSizeLarge.args = {
  size: 'large'
}
