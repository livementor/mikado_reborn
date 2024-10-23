<script setup lang="ts">
import { MkrNotificationBadge, MkrIcon } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const bindingProps = ref({show: true})
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  { name: 'show', type: 'boolean', value: true }
]

</script>

<template>
  <section class="variant">
    <div>
      <MkrNotificationBadge v-bind="bindingProps">
        <MkrIcon name="mail" />
      </MkrNotificationBadge>
    </div>
    <div>
      <MkrNotificationBadge v-bind="bindingProps">
        <MkrIcon name="paper-airplane" />
      </MkrNotificationBadge>
    </div>
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="bindingProps=$event"
    />
  </ParametersTable>
</template>
