import { MkrList, MkrListItem } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/List',
  components: { MkrList },
  subcomponents: {
    MkrListItem,
  },
  argTypes: {
    size: { control: { type: 'inline-radio', options: ['small', 'medium', 'large'] }, defaultValue: { summary: 'medium' }, description: 'Size of list - Apply CSS style according with the chosen size' },
    padded: { control: { type: 'boolean' }, defaultValue: { summary: 'false' }, description: 'Apply padding and a dashed border on `<mkr-list />`' },
    itemHoverable: { control: { type: 'boolean' }, defaultValue: { summary: 'false' }, description: 'Apply CSS style on `<mkr-list-item />` on hover' },
    clickable: { control: { type: 'boolean' }, defaultValue: { summary: 'false' }, description: 'Option of `<mkr-list-item />` to make the component a `<button />` clickable' },
  },
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
    <mkr-list :item-hoverable="$props.itemHoverable" :size="$props.size" :padded="$props.padded">
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
  padded: false,
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

const ListSimpleTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <mkr-list :size="$props.size" :item-hoverable="$props.itemHoverable" :padded="$props.padded">
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

export const ListPadded = ListSimpleTemplate.bind({});
ListPadded.args = {
  size: 'medium',
  padded: true,
  itemHoverable: false,
}

export const ListSizeMedium = ListSimpleTemplate.bind({});
ListSizeMedium.args = {
  size: 'medium',
  padded: false,
  itemHoverable: false,
}

export const ListSizeLarge = ListSimpleTemplate.bind({});
ListSizeLarge.args = {
  size: 'large',
  padded: false,
  itemHoverable: false,
}
