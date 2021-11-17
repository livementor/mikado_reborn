import { MkrList, MkrListItem } from "../../../mikado_reborn/src/components";
import { BgItemVariant, ListSize } from '../../../mikado_reborn/src/components/List/List.vue'

export default {
  title: 'Components/List',
  components: { MkrList },
  subcomponents: {
    MkrListItem,
  },
  argTypes: {
    bgItemVariant: { control: { type: 'inline-radio', options: [...Object.values(BgItemVariant), undefined] } },
    size: { control: { type: 'inline-radio', options: [...Object.values(ListSize)] } },
    clickable:  { control: { type: 'boolean' } },
  },
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
    <MkrList :bgItemVariant="$props.bgItemVariant" :size="$props.size">
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
  bgItemVariant: undefined,
  clickable: false,
  size: 'medium'
};

const ListOddTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <MkrList bgItemVariant="odd">
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
export const ListOdd = ListOddTemplate.bind({});

const ListEvenTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <MkrList bgItemVariant="even">
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
export const ListEven = ListEvenTemplate.bind({});

const ListHoverTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <MkrList bgItemVariant="hover">
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
