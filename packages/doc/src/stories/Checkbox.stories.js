import { MkrCheckbox } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/Checkbox',
  component: MkrCheckbox,
  argTypes: {
    size: { control: { type: 'select', options: ['medium', 'small'] } },
  }
};

const CheckboxTemplate = (args) => ({
  props: Object.keys(args),
  data: () => ({
    checked: true,
  }),
  template: `
    <mkr-checkbox v-bind="$props" v-model="checked" />
  `,
});

const CheckboxListTemplate = (args) => ({
  props: Object.keys(args),
  data: () => ({
    values: []
  }),
  template: `
    <div>
      <div style="display: flex;">
        <mkr-checkbox name="checkbox1" v-model="values" />
        <mkr-checkbox name="checkbox2" v-model="values" style="margin-left: 10px" />
        <mkr-checkbox name="checkbox3" v-model="values" style="margin-left: 10px;" />
      </div>
      
      <div style="margin-top: 15px;">
        {{values}}
      </div>
    </div>
  `,
})

export const Checkbox = CheckboxTemplate.bind({});
Checkbox.args = {
  size: 'medium'
};

export const CheckboxSmall = CheckboxTemplate.bind({});
CheckboxSmall.args = {
  size: 'small'
};

export const CheckboxList = CheckboxListTemplate.bind({});
Checkbox.args = {
  size: 'medium'
};
