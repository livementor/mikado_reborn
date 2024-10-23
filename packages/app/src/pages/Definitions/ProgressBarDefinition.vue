<script setup lang="ts">
import { MkrProgressbar } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const bindingProps = ref({total: 4});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  { name: 'total', type: 'number', value: 4 },
  { name: 'current', type: 'number', value: 1 },
  { name: 'size', type: 'select', options: ['medium', 'small'].map(value => ({value})), value: 'medium' },
  { name: 'hideState', type: 'boolean', value: false },
  { name: 'shrinkEmoji', type: 'boolean', value: false },
]

</script>

<template>
  <section class="variant">
    <div>
      <div style="width: 200px;">
        <MkrProgressbar
          v-bind="bindingProps"
        />
      </div>
    </div>
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="bindingProps=$event"
    />
  </ParametersTable>
</template>
