<script setup lang="ts">
import { MkrSwitch } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp = [
  { name: 'value', type:'boolean' },
];

const activated = ref(false)

</script>

<template>
  <section class="variant">
    <div>
      <MkrSwitch v-model="activated"></MkrSwitch>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="activated=$event.value"></PropParameters>
  </ParametersTable>

</template>