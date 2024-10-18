<script setup lang="ts">
import { MkrTextarea } from '@livementor/mikado_reborn/src/components'
import { ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'

const bindingProps = ref({});
const componentProps: MkdComponentProp = [
  { name: 'minlength', type: 'number', value: 0 },
  { name: 'maxlength', type: 'number', value: 100 },
  { name: 'placeholder', type: 'text', value: "Placeholder..." },
  { name: 'error', type: 'boolean' },
  { name: 'rows', type: 'number' },
]

</script>

<template>
  <section>
    <MkrTextarea v-bind="bindingProps"></MkrTextarea>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="bindingProps=$event"></PropParameters>
  </ParametersTable>

</template>
