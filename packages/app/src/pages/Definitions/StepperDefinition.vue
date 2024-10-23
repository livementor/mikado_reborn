<script setup lang="ts">
import { MkrStepper, type StepperItem, MkrExpansionPanel } from '@livementor/mikado_reborn/src/components'
import { computed, onBeforeMount, ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import SlotParameter from '@/components/Parameters/SlotParameter.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const items: Array<string | StepperItem> = [
  'Formation',
  <StepperItem> { type: 'warning', label: 'Paiement' },
  <StepperItem> { type: 'error', label: 'Réservation' },
  'Confirmation',
]

const bindingProps = ref({step:1, items: items});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  { name: 'step', type: 'number', value: 1 },
  { name: 'items', type: 'json', value: JSON.stringify(items, null, 2)  },
]

const step1 = ref('Step 1')
const step2 = ref('Step 2')
const step3 = ref('Step 3')
const step4 = ref('Step 4')

const stepNames = computed(() => bindingProps.value.items
    .map((item: string | StepperItem) => typeof item === 'string' ? item : item.label))

</script>

<template>
  <section>
    <MkrStepper
      v-if="bindingProps.items"
      :step="bindingProps.step"
      :items="bindingProps.items"
    >
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
    <PropParameters
      :component-props
      @change="bindingProps=$event"
    />
    <tr>
      <td colspan="2">
        <MkrExpansionPanel :default-expanded="false">
          <template #header>
            Contenus des étapes
          </template>
          <template #content>
            <table style="width: 100%">
              <SlotParameter
                v-model="step1"
                :name="stepNames[0]"
              />
              <SlotParameter
                v-model="step2"
                :name="stepNames[1]"
              />
              <SlotParameter
                v-model="step3"
                :name="stepNames[2]"
              />
              <SlotParameter
                v-model="step4"
                :name="stepNames[3]"
              />
            </table>
          </template>
        </MkrExpansionPanel>
      </td>
    </tr>
  </ParametersTable>
</template>