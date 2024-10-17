<script setup lang="ts">

import { MkrModal, MkrContainedButton } from '@livementor/mikado_reborn/src/components'
import PropParameters from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { ref } from 'vue'

const propsBinding = ref({});
const componentProps = [
  { name: 'size' ,type: 'select', options: ['large', 'medium'], value: 'medium' },
  { name: 'closeable', type: 'boolean' },
  { name: 'overlay', type: 'boolean' },
  { name: 'scrollable', type: 'boolean' },
  { name: 'noHeader', type: 'boolean' },
  { name: 'value', type: 'boolean' },
  { name: 'opened', type: 'boolean' },
]

const showModal = ref(false);
const open = () => showModal.value = !showModal.value

</script>

<template>
  <section class="variant">
    <div>
        <MkrModal v-bind="propsBinding" v-model="showModal">
          <template #title>Titre</template>
          Hello World
          <template #footer>Footer</template>

        </MkrModal>
        <MkrContainedButton @click="open">Open Modal</MkrContainedButton>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
  </ParametersTable>

</template>
