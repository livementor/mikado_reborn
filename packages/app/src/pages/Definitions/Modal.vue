<script setup lang="ts">
import { MkrModal, MkrContainedButton } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const propsBinding = ref({ closeable: true });
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp = [
  { name: 'size' ,type: 'select', options: ['large', 'medium'], value: 'medium' },
  { name: 'closeable', type: 'boolean', value: true },
  { name: 'overlay', type: 'boolean', value: false },
  { name: 'scrollable', type: 'boolean', value: false },
  { name: 'noHeader', type: 'boolean', value: false },
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
