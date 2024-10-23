<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { MkrBadge, type MkrBadgeType } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import SlotParameter from '@/components/Parameters/SlotParameter.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const propsBinding = ref({type: <MkrBadgeType> 'primary'});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  { name: 'type', type: 'select', value: 'primary',
    options: (<MkrBadgeType[]> ['danger', 'danger-light', 'info', 'info-light', 'primary', 'primary-light', 'secondary', 'success', 'success-light', 'warning-light', 'other-1'])
      .map(value => ({value}))},
]

const personalizedSlot = ref('Badge');

</script>

<template>
  <section class="variant">
    <div>
      <MkrBadge v-bind="propsBinding">
        {{ personalizedSlot }}
      </MkrBadge>
    </div>
  </section>

  <ParametersTable>
    <SlotParameter v-model="personalizedSlot" />
    <PropParameters
      :component-props
      @change="propsBinding=$event"
    />
  </ParametersTable>
</template>
