<script setup lang="ts">
import { MkrList, MkrListItem, MkrTextButton, MkrContainedButton } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const propsBinding = ref({});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  { name: 'size' ,type: 'select', options: ['large', 'medium', 'small'].map(value => ({value})), value: 'medium' },
  { name: 'itemHoverable', type: 'boolean' },
  { name: 'padded', type: 'boolean' },
  { name: 'clickable', type: 'boolean' },
]

</script>

<template>
  <section class="variant">
    <div>
      <MkrList v-bind="propsBinding">
        <MkrListItem>
          First
          <MkrTextButton
            icon="chat"
            size="small"
            style="margin-left: 3rem;"
          />
        </MkrListItem>
        <MkrListItem>
          Second
          <MkrContainedButton
            icon="download"
            size="small"
            style="margin-left: 3rem;"
          >
            Télécharger
          </MkrContainedButton>
        </MkrListItem>
        <MkrListItem v-bind="propsBinding">
          Third
        </MkrListItem>
        <MkrListItem v-bind="propsBinding">
          Fourth
        </MkrListItem>
      </MkrList>
    </div>
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="propsBinding=$event"
    />
  </ParametersTable>
</template>
