<script setup lang="ts">
import { MkrTextfield } from '@livementor/mikado_reborn/src/components'
import { ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters from '@/components/Parameters/PropParameters.vue'
import icons from '@livementor/mikado_reborn/src/utils/icons'

const bindingProps = ref({});
const componentProps = [
  { name: 'placeholder', type: 'text', value: "Placeholder..." },
  { name: 'type', type: 'select', options: ['text', 'email', 'password', 'date'], value: "text" },
  { name: 'iconName', type: 'select', options: icons },
  { name: 'error', type: 'boolean' },
]

</script>

<template>
  <section>
    <MkrTextfield v-bind="bindingProps"></MkrTextfield>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="bindingProps=$event"></PropParameters>
  </ParametersTable>

</template>
