import { MkrList, MkrListItem } from "../../../mikado_reborn/src/components";
import { BgItemVariant } from '../../../mikado_reborn/src/components/List/List.vue'

export default {
  title: 'Components/List',
  components: { MkrList },
  subcomponents: {
    MkrListItem,
  },
  argTypes: {
    bgItemVariant: { control: { type: 'inline-radio', options: [...Object.values(BgItemVariant), undefined] } },
    clickable: false,
  },
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
    <MkrList :bgItemVariant="$props.bgItemVariant">
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
  clickable: false
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
