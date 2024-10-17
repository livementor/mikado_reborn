<script setup lang="ts">
import { MkrExpansionPanel, MkrInteractiveIcon } from '@livementor/mikado_reborn/src/components'
import { ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters from '@/components/Parameters/PropParameters.vue'

const propsBinding = ref({defaultExpanded: false});
const componentProps = [ { name: 'defaultExpanded', type: 'boolean', value: false} ]

</script>

<template>
  <section>
    <div style="margin-bottom: 30px">
      <MkrExpansionPanel v-bind="propsBinding">
        <template #header="{expanded}">Header {{expanded ? 'expanded' : 'collapsed' }}</template>
        <template #content>
          Lorem ipsum dolor sit amet.
        </template>
      </MkrExpansionPanel>
    </div>
    <div style="margin-bottom: 30px">
      <MkrExpansionPanel v-bind="propsBinding">
        <template #activator="{expanded, toggle}"><MkrInteractiveIcon :name="expanded ? 'eye-off' : 'eye'" @click="toggle" /></template>
        <template #header="{expanded}">Header {{ expanded ? 'expanded' : 'collapsed' }}</template>
        <template #content>
          Lorem ipsum dolor sit amet.
        </template>
      </MkrExpansionPanel>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="propsBinding.defaultExpanded=$event.defaultExpanded || false"></PropParameters>
  </ParametersTable>
</template>

<style scoped lang="scss">

</style>