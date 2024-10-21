<script setup lang="ts">
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import { MkrSnackbar } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const bindingProps = ref({ message: "Message de démonstration", timeout: 0});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp = [
  { name: 'message', type: 'text', value: "Message de démonstration"},
  { name: 'timeout', type: 'number', value: 0 },
  { name: 'error', type: 'boolean', value: true },
  { name: 'success', type: 'boolean' },
  { name: 'neutral', type: 'boolean' },
  { name: 'closable', type: 'boolean' },
];

</script>

<template>
  <section class="variant">
    <div>
      <MkrSnackbar v-bind="bindingProps" />
    </div>
  </section>


  <ParametersTable>
    <PropParameters :componentProps @change="bindingProps=$event">

    </PropParameters>
  </ParametersTable>
</template>