<script setup lang="ts">
import { MkrSteppedProgress } from '@livementor/mikado_reborn/src/components'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters from '@/components/Parameters/PropParameters.vue'
import { ref } from 'vue'
import colors from '@livementor/mikado_reborn/src/utils/colors';

const bindingProps = ref({});
const componentProps = [
  { name: 'steps', type: 'number', value: 4 },
  { name: 'progress', type: 'number', value: 1 },
  { name: 'color', type: 'select', options: colors, value: 'primary' },
  { name: 'backgroundColor', type: 'select', options: colors, value: 'neutral-light' },
]

</script>

<template>
  <section>
    <MkrSteppedProgress v-bind="bindingProps"></MkrSteppedProgress>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="bindingProps=$event"></PropParameters>
  </ParametersTable>

</template>