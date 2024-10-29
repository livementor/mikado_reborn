<script setup lang="ts">
import { MkrTextButton, MkrContainedButton, MkrOutlinedButton } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import SlotParameter from '@/components/Parameters/SlotParameter.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import icons from '@livementor/mikado_reborn/src/utils/icons';
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'
import Button from '@livementor/mikado_reborn/src/components/Button/Button.vue'

const personalizedSlot = ref('Button');
const propsBinding = ref({}) // no default
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  { name: 'theme', type: 'select', options: [
    { value:"container", variants: ['TextButton', 'ContainedButton'] },
      { value: 'neutral' },
    { value:"container", variants:['TextButton'] },
      { value: 'danger' },
      { value: 'neutral-60' },
      { value: 'neutral-80' },
      { value: 'secondary-dark' },
    { value:"container", variants:['ContainedButton'] },
      { value: 'danger-light' },
      { value: 'primary' },
      { value: 'primary-light' },
      { value: 'secondary' },
      { value: 'secondary-light' }
    ] },
  { name: 'size', type: 'select', options: [{value: 'large' }, {value: 'medium' }, { value:"container", variants:['TextButton', 'ContainedButton'] }, {value: 'small' }] },
  { name: 'icon', type: 'select', options: icons.map(value => ({value})) },
  { name: 'iconSide', type: 'select', options: ['left', 'right'].map(value => ({value}))  },
  { name: 'disabled', type: 'boolean', value: false },
  { name: 'activated', type: 'boolean', value: false },
]


const variantProps = {
  TextButton: ['theme', 'size', 'icon', 'iconSide', 'disabled', 'activated'],
  ContainedButton: ['theme', 'size', 'icon', 'iconSide', 'disabled'],
  OutlinedButton: ['size', 'icon', 'iconSide', 'disabled']
}


</script>

<template>
  <section class="variant">
    <div
      v-for="(variant, index) in [MkrTextButton, MkrContainedButton, MkrOutlinedButton]"
      :key="index"
    >
      <h6>{{ variant.name }}</h6>
      <component
        :is="variant"
        v-bind="propsBinding"
      >
        {{ personalizedSlot }}
      </component>
    </div>
  </section>
  <section class="variant">
    <div>
      <p>
        Peut aussi être utilisé en tant que <Button
          href="#"
          size="small"
          theme="primary"
          v-bind="propsBinding"
        >
          Lien
        </Button>
      </p>
    </div>
  </section>
  <ParametersTable>
    <SlotParameter v-model="personalizedSlot" />
    <PropParameters
      :component-props
      @change="propsBinding=$event"
      :variant-props="variantProps"
    />
  </ParametersTable>
</template>
