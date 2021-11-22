import { MkrList, MkrListItem } from "../../../mikado_reborn/src/components";
import { ListSize } from '../../../mikado_reborn/src/components/List/List.vue'

export default {
  title: 'Components/List',
  components: { MkrList },
  subcomponents: {
    MkrListItem,
  },
  argTypes: {
    itemHoverable: { control: { type: 'boolean' }, defaultValue: { summary: 'false' }, description: 'Apply CSS style on `<ListItem />` on hover' },
    size: { control: { type: 'inline-radio', options: [...Object.values(ListSize)] }, defaultValue: { summary: 'medium' }, description: 'Size of list - Apply CSS style according with the chosen size' },
    clickable: { control: { type: 'boolean' }, defaultValue: { summary: 'false' }, description: 'Option of `<ListItem />` to make the component a `<button />` clickable' },
  },
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
    <MkrList :item-hoverable="$props.itemHoverable" :size="$props.size">
      <MkrListItem>
        First
        <MkrTextButton icon="chat" size="small" style="margin-left: 3rem;" />
      </MkrListItem>
      <MkrListItem>
        Second
        <MkrContainedButton icon="download" size="small" style="margin-left: 3rem;">
          Télécharger
        </MkrContainedButton>
      </MkrListItem>
      <MkrListItem :clickable="$props.clickable"> Third </MkrListItem>
      <MkrListItem :clickable="$props.clickable"> Fourth </MkrListItem>
    </MkrList>
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
    <MkrList item-hoverable>
      <MkrListItem>
        First
        <MkrTextButton icon="chat" size="small" style="margin-left: 3rem;" />
      </MkrListItem>
      <MkrListItem>
        Second
        <MkrContainedButton icon="download" size="small" style="margin-left: 3rem;">
          Télécharger
        </MkrContainedButton>
      </MkrListItem>
      <MkrListItem :clickable="$props.clickable"> Third </MkrListItem>
      <MkrListItem :clickable="$props.clickable"> Fourth </MkrListItem>
    </MkrList>
  `,
});
export const ListHover = ListHoverTemplate.bind({});

const ListItemsClickableTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <MkrList>
      <MkrListItem :clickable="true">
        First
      </MkrListItem>
      <MkrListItem :clickable="true">
        Second
      </MkrListItem>
      <MkrListItem :clickable="true"> Third </MkrListItem>
      <MkrListItem :clickable="true"> Fourth </MkrListItem>
    </MkrList>
  `,
});
export const ListItemsClickable = ListItemsClickableTemplate.bind({});

const ListSizeSmallTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <MkrList size="small">
      <MkrListItem>
        First
      </MkrListItem>
      <MkrListItem>
        Second
      </MkrListItem>
      <MkrListItem> Third </MkrListItem>
      <MkrListItem> Fourth </MkrListItem>
    </MkrList>
  `,
});
export const ListSizeSmall = ListSizeSmallTemplate.bind({});

const ListSizeMediumTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <MkrList size="medium">
      <MkrListItem>
        First
      </MkrListItem>
      <MkrListItem>
        Second
      </MkrListItem>
      <MkrListItem> Third </MkrListItem>
      <MkrListItem> Fourth </MkrListItem>
    </MkrList>
  `,
});
export const ListSizeMedium = ListSizeMediumTemplate.bind({});

const ListSizeLargeTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <MkrList size="large">
      <MkrListItem>
        First
      </MkrListItem>
      <MkrListItem>
        Second
      </MkrListItem>
      <MkrListItem> Third </MkrListItem>
      <MkrListItem> Fourth </MkrListItem>
    </MkrList>
  `,
});
export const ListSizeLarge = ListSizeLargeTemplate.bind({});
