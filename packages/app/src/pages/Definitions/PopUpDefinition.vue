<script setup lang="ts">
import{ MkrContainedButton, MkrCard, MkrPopUp } from '@livementor/mikado_reborn/src/components'
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
  { name: 'dismissable', type: 'boolean', value: true },
  { name: 'placement', type: 'select', value: 'bottom', options: [
      { value: "container", variants: ['type Placement'] },
      ...["auto", "auto-start", "auto-end", "top", "bottom", "right", "left", "top-start", "top-end", "bottom-start", "bottom-end", "right-start", "right-end", "left-start", "left-end"].map(value => ({value}))] }
]


const show = ref(false)
</script>

<template>
  <section class="variant">
    <div>
      <MkrPopUp
        v-bind="bindingProps"
        v-model="show"
      >
        <template #anchor>
          <MkrContainedButton>Pop me !</MkrContainedButton>
        </template>
        <MkrCard
          :elevated="true"
          style="padding: 16px;"
        >
          <span
            class="body-caption-font"
            style="margin: 16px;"
          >Un text de test</span>
          <MkrContainedButton style="margin: auto;">
            Action
          </MkrContainedButton>
        </MkrCard>
      </MkrPopUp>
    </div>
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="bindingProps=$event"
    />
  </ParametersTable>
</template>
