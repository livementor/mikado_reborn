<script setup lang="ts">
import { MkrAvatar } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const propsBinding = ref({})
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp = [
  { name: 'size', type: 'number', value: 5 },
  { name: 'src', type:'text', value: "https://randomuser.me/api/portraits/men/43.jpg" },
  { name: 'alt', type:'text', value: 'Hey man !' } ];

</script>

<template>
  <section class="variant">
    <div>
      <MkrAvatar v-bind="propsBinding"></MkrAvatar>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
  </ParametersTable>

</template>
