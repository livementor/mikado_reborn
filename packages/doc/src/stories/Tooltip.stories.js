import { MkrTooltip } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Tooltip',
  component: MkrTooltip,
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
    <div style="height:200px;display:flex;align-items:center;justify-content: center;">
      <mkr-tooltip v-bind="$props">
        <mkr-contained-button size="medium" icon="chat" theme="primary" />
      </mkr-tooltip>
    </div>
  `,
});

export const Tooltip = Template.bind({});
Tooltip.args = {
  label: 'Access chat',
  disabled: false,

};

const TopLevelTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <div style="width:auto;height:auto;overflow:hidden;position:relative;">
      <mkr-tooltip v-bind="$props">
        <mkr-contained-button size="medium" icon="chat" theme="primary" />
      </mkr-tooltip>
    </div>
  `,
});

export const TooltipTopLevel = TopLevelTemplate.bind({});
TooltipTopLevel.args = {
  label: 'Access chat',
  disabled: false,
  topLevel: true,
  placement: ''
};
