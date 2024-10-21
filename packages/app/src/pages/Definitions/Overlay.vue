<script setup lang="ts">
import { MkrContainedButton, MkrOverlay } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const bindingProps = ref({});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp = [
  { name: 'color', type: 'select', options: ['dark', 'light'], value: 'dark' },
  { name: 'keepOnClick', type: 'boolean', value: false },
]

const show = ref(false)

</script>

<template>
  <section id="frame" class="variant">
    <div>
      <MkrContainedButton @click="show=true">Afficher l'overlay</MkrContainedButton>
      <MkrOverlay v-bind="bindingProps" v-model="show"/>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="bindingProps=$event"></PropParameters>
  </ParametersTable>
</template>