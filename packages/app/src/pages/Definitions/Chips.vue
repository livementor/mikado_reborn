<script setup lang="ts">
import { MkrChips, MkrChipsList } from '@livementor/mikado_reborn/src/components'
import { ref } from 'vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'

const propsBinding = ref({})
const componentProps: MkdComponentProp = [
  // { name: 'name', type: 'text' },
  { name: 'size', type: 'select', options: ['medium', 'small'], value: 'medium' },
  { name: 'orientation', type: 'select', options: ['row', 'column'] },
  { name: 'wrap', type: 'boolean' },
]

const model = ref(null);

</script>

<template>
  <section class="variant">
    <div>
      <MkrChipsList v-bind="propsBinding" v-model="model">
        <MkrChips label="Chien" value="chien"/>
        <MkrChips label="Chat" value="chat"/>
        <MkrChips label="Perroquet" value="perroquet"/>
      </MkrChipsList>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
  </ParametersTable>

</template>
