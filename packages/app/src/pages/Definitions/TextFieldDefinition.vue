<script setup lang="ts">
import { MkrTextfield } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import icons from '@livementor/mikado_reborn/src/utils/icons'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const bindingProps = ref({});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  { name: 'placeholder', type: 'text', value: "Placeholder..." },
  { name: 'type', type: 'select', options: ['text', 'email', 'password', 'date'].map(value => ({value})), value: "text" },
  { name: 'iconName', type: 'select', options: icons.map(value => ({value})) },
  { name: 'error', type: 'boolean' },
  { name: 'disabled', type: 'boolean' },
]

</script>

<template>
  <section>
    <MkrTextfield v-bind="bindingProps" />
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="bindingProps=$event"
    />
  </ParametersTable>
</template>
