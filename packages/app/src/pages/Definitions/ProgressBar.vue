<script setup lang="ts">
import { MkrProgressbar } from '@livementor/mikado_reborn/src/components'
import { ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'

const bindingProps = ref({total: 4});
const componentProps: MkdComponentProp = [
  { name: 'total', type: 'number', value: 4 },
  { name: 'current', type: 'number', value: 1 },
  { name: 'size', type: 'select', options: ['medium', 'small'], value: 'medium' },
  { name: 'hideState', type: 'boolean', value: false },
  { name: 'shrinkEmoji', type: 'boolean', value: false },
]

</script>

<template>
<section class="variant">
  <div>
    <div style="width: 200px;">
      <MkrProgressbar v-bind="bindingProps"/>
    </div>
  </div>

</section>

  <ParametersTable>
    <PropParameters :componentProps @change="bindingProps=$event"></PropParameters>
  </ParametersTable>

</template>
