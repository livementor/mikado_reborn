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
  { name: 'autosize', type: 'boolean'}
]

</script>

<template>
  <section>
    <MkrTextarea   
      :min-rows="1"
      :max-rows="10"
      v-bind="bindingProps"
      placeholder="Interrogez l’assistant ou décrivez ce que vous voudriez apprendre... Interrogez l’assistant ou décrivez ce que vous voudriez apprendre... Interrogez l’assistant ou décrivez ce que vous voudriez apprendre... Interrogez l’assistant ou décrivez ce que vous voudriez apprendre..."
      autosize
      style="line-height: 1.5;"
    />
  </section>
  <section>
    <MkrTextarea
      :minlength="10"
      :maxlength="100"
      :min-rows="3"
      resizable
      show-counter
      v-bind="bindingProps"
    />
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="bindingProps=$event"
    />
  </ParametersTable>
</template>
