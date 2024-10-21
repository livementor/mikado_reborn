<script setup lang="ts">
import { MkrTextButton, MkrContainedButton, MkrOutlinedButton } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import SlotParameter from '@/components/Parameters/SlotParameter.vue'
import ParametersTable from '@/components/ParametersTable.vue'
// @ts-ignore
import icons from '@livementor/mikado_reborn/src/utils/icons';
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const personalizedSlot = ref('Button');
const propsBinding = ref({}) // no default
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp = [
  { name: 'theme', type: 'select', options: [
    { isGroupName: true, mkr:['TextButton', 'ContainedButton'] },
      'neutral',
    { isGroupName: true, mkr:['TextButton'] },
      'danger',
      'neutral-60',
      'neutral-80',
      'secondary-dark',
    { isGroupName: true, mkr:['ContainedButton'] },
      'danger-light',
      'primary',
      'primary-light',
      'secondary',
      'secondary-light'
    ] },
  { name: 'size', type: 'select', options: ['large', 'medium', { isGroupName: true, mkr:['TextButton', 'ContainedButton'] }, 'small'] },
  { name: 'icon', type: 'select', options: icons },
  { name: 'iconSide', type: 'select', options: ['left', 'right']  },
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
    <div v-for="(variant, index) in [MkrTextButton, MkrContainedButton, MkrOutlinedButton]" :key="index">
      <h6>{{ variant.__name }}</h6>
      <component :is="variant" v-bind="propsBinding">{{ personalizedSlot }}</component>
    </div>
  </section>

  <ParametersTable>
    <SlotParameter v-model="personalizedSlot"></SlotParameter>
    <PropParameters :componentProps @change="propsBinding=$event" :variantProps></PropParameters>
  </ParametersTable>

</template>
