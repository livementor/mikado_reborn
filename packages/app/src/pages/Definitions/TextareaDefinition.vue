<script setup lang="ts">
import { MkrTextarea } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters from '@/components/Parameters/PropParameters.vue'
import { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const bindingProps = ref({});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
});
let componentProps: MkdComponentProp[] = [
  { name: 'minlength', type: 'number', value: 0 },
  { name: 'maxlength', type: 'number', value: 100 },
  { name: 'placeholder', type: 'text', value: "Placeholder..." },
  { name: 'error', type: 'boolean' },
  { name: 'rows', type: 'number' },
]

</script>

<template>
  <section>
    <MkrTextarea v-bind="bindingProps" />
  </section>
  <section>
    <MkrTextarea
      v-bind="bindingProps"
      :minlength="10"
      :maxlength="100"
      show-counter
    />
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="bindingProps=$event"
    />
  </ParametersTable>
</template>
