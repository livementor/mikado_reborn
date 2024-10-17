<script setup lang="ts">
import { ref } from 'vue'
import { MkrDataTable } from '@livementor/mikado_reborn/src/components'
import PropParameters from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'

const propsBinding = ref({});
const componentProps = [
  { name: 'title', type: 'text', value: 'Formation' },
  { name: 'columns' },
  { name: 'items' },
]

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

</script>

<template>
  <section class="variant">
    <div>
      <MkrDataTable v-bind="propsBinding" :columns="data.columns" :items="data.items"></MkrDataTable>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
  </ParametersTable>

</template>
