import { interactiveIconThemes } from '@livementor/mikado_reborn/src/components/InteractiveIcon/InteractiveIcon'
import { MkrInteractiveIcon } from '../../../mikado_reborn/src/components'
import icons from '../../../mikado_reborn/src/utils/icons'

export default {
  title: 'Components/InteractiveIcon',
  component: MkrInteractiveIcon,
  argTypes: {
    name: { control: { type: 'select', options: icons } },
    theme: { control: { type: 'select', options: Object.values(interactiveIconThemes) } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-interactive-icon v-bind="$props"/>',
})

export const InteractiveIcon = Template.bind({})
InteractiveIcon.args = {
  name: icons[0],
  activated: false
}

const LinkTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-interactive-icon href="https://google.com" target="_blank" v-bind="$props"/>',
})

export const InteractiveIconLink = LinkTemplate.bind({})
InteractiveIconLink.args = {
  name: icons[0],
  linkify: true,
  activated: false
}