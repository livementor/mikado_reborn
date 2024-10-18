<script setup lang="ts">

import { MkrList, MkrListItem, MkrTextButton, MkrContainedButton } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { ref } from 'vue'

const propsBinding = ref({});
const componentProps: MkdComponentProp = [
  { name: 'size' ,type: 'select', options: ['large', 'medium', 'small'], value: 'medium' },
  { name: 'itemHoverable', type: 'boolean' },
  { name: 'padded', type: 'boolean' },
  { name: 'clickable', type: 'boolean' },
]

</script>

<template>
  <section class="variant">
    <div>
      <MkrList v-bind="propsBinding">
        <MkrListItem>
          First
          <MkrTextButton icon="chat" size="small" style="margin-left: 3rem;" />
        </MkrListItem>
        <MkrListItem>
          Second
          <MkrContainedButton icon="download" size="small" style="margin-left: 3rem;">
            Télécharger
          </MkrContainedButton>
        </MkrListItem>
        <MkrListItem v-bind="propsBinding"> Third </MkrListItem>
        <MkrListItem v-bind="propsBinding"> Fourth </MkrListItem>
      </MkrList>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
  </ParametersTable>

</template>
