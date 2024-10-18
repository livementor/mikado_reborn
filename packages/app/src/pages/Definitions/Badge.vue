<script setup lang="ts">
import { ref } from 'vue'
import { MkrBadge, type MkrBadgeType } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import SlotParameter from '@/components/Parameters/SlotParameter.vue'
import ParametersTable from '@/components/ParametersTable.vue'

// ['danger', 'danger-light', 'info', 'info-light', 'primary', 'primary-light', 'secondary', 'success', 'success-light', 'warning-light', 'other-1']

const propsBinding = ref({type: <MkrBadgeType> 'primary'});
const componentProps: MkdComponentProp = [
  { name: 'type', type: 'select', value: 'primary',
    options: <MkrBadgeType[]> ['danger', 'danger-light', 'info', 'info-light', 'primary', 'primary-light', 'secondary', 'success', 'success-light', 'warning-light', 'other-1'] },
]

const personalizedSlot = ref('Badge');

</script>

<template>
  <section class="variant">
    <div>
      <MkrBadge v-bind="propsBinding">{{ personalizedSlot }}</MkrBadge>
    </div>
  </section>

  <ParametersTable>
    <SlotParameter v-model="personalizedSlot"></SlotParameter>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
  </ParametersTable>

</template>
