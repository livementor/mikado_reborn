<script setup lang="ts">
import { MkrTooltip, MkrContainedButton } from '@livementor/mikado_reborn/src/components'
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
let componentProps: MkdComponentProp[] = [
  { name: 'label', type: 'text', value: "Messagerie" },
  { name: 'placement', type: 'select', value: 'bottom', options: [
      { value: "container", variants: ['type Placement'] },
      ...["auto", "auto-start", "auto-end", "top", "bottom", "right", "left", "top-start", "top-end", "bottom-start", "bottom-end", "right-start", "right-end", "left-start", "left-end"].map(value => ({value}))] },
  { name: 'disabled', type: 'boolean' },
  { name: 'topLevel', type: 'boolean' },
  { name: 'addScrollListener', type: 'boolean' },
]

</script>

<template>
  <section class="variant">
    <div>
      <div style="height:200px;display:flex;align-items:center;justify-content: center;">
        <MkrTooltip v-bind="bindingProps">
          <MkrContainedButton
            size="medium"
            icon="chat"
            theme="primary"
          />
        </MkrTooltip>
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