<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { MkrDataTable } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

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

const propsBinding = ref({columns: data.columns, items: data.items, title: 'Formation'});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  { name: 'title', type: 'text', value: 'Formation' },
  { name: 'columns', type: 'json', value: JSON.stringify(data.columns, null, 2) },
  { name: 'items', type: 'json', value: JSON.stringify(data.items, null, 2) },
]

</script>

<template>
  <section class="variant">
    <div>
      <MkrDataTable
        :columns="propsBinding.columns"
        :items="propsBinding.items"
        :title="propsBinding.title"
      />
    </div>
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="propsBinding=$event"
    />
  </ParametersTable>
</template>
