<script setup lang="ts">
import { ref } from 'vue'
import { MkrDataTable } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'

const data = {
  columns: [
    {
      label: 'Début',
      value: 'startDate',
    },
    {
      label: 'Fin',
      value: 'endDate',
    },
    {
      label: 'Formation',
      value: 'formation',
    }
  ],
  items: [
    {
      startDate: '12/02/2019',
      endDate: '13/05/2019',
      formation: 'Nom de la formation'
    },
    {
      startDate: '08/01/2020',
      endDate: '12/04/2020',
      formation: 'Nom de la formation'
    }
  ]};

const propsBinding = ref({columns: data.columns, items: data.items});
const componentProps: MkdComponentProp = [
  { name: 'title', type: 'text', value: 'Formation' },
  { name: 'columns', type: 'json', value: JSON.stringify(data.columns, null, 2) },
  { name: 'items', type: 'json', value: JSON.stringify(data.items, null, 2) },
]

</script>

<template>
  <section class="variant">
    <div>
      <MkrDataTable v-bind="propsBinding"></MkrDataTable>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
  </ParametersTable>

</template>
