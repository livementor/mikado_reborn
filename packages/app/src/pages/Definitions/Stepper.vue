<script setup lang="ts">
import { MkrStepper, MkrExpansionPanel } from '@livementor/mikado_reborn/src/components'
import { ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters from '@/components/Parameters/PropParameters.vue'
import SlotParameter from '@/components/Parameters/SlotParameter.vue'

const items = [
  'Formation',
  { type: 'warning', label: 'Paiement' },
  { type: 'error', label: 'Réservation' },
  'Confirmation',
]


const bindingProps = ref({step:1, items: items});
const componentProps = [
  { name: 'step', type: 'number', value: 1 },
  { name: 'items', type: 'json', value: JSON.stringify(items, null, 2)  },
]


const step1 = ref('Step 1')
const step2 = ref('Step 2')
const step3 = ref('Step 3')
const step4 = ref('Step 4')

</script>

<template>
  <section>
    <MkrStepper v-bind="bindingProps">
      <template #step_1>
        <div>{{ step1 }}</div>
      </template>
      <template #step_2>
        <div>{{ step2 }}</div>
      </template>
      <template #step_3>
        <div>{{ step3 }}</div>
      </template>
      <template #step_4>
        <div>{{ step4 }}</div>
      </template>
    </MkrStepper>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="bindingProps=$event" />
    <tr>
      <td colspan="2">
        <MkrExpansionPanel :defaultExpanded="false">
          <template #header>Contenus des étapes</template>
          <template #content>
            <table style="width: 100%">
              <SlotParameter v-model="step1" :name="bindingProps.items && bindingProps.items[0] ? (bindingProps.items[0].label || bindingProps.items[0]) : '1'"></SlotParameter>
              <SlotParameter v-model="step2" :name="items[1].label || items[1]"></SlotParameter>
              <SlotParameter v-model="step3" :name="items[2].label || items[2]"></SlotParameter>
              <SlotParameter v-model="step4" :name="items[3].label || items[3]"></SlotParameter>
            </table>
          </template>
        </MkrExpansionPanel>
      </td>
    </tr>
  </ParametersTable>

</template>