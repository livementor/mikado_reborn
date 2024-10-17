<script setup lang="ts">
import { MkrNotificationBadge, MkrIcon } from '@livementor/mikado_reborn/src/components'
import { ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters from '@/components/Parameters/PropParameters.vue'

const bindingProps = ref({})
const componentProps = [
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
    <PropParameters :componentProps @change="bindingProps=$event"></PropParameters>
  </ParametersTable>
</template>
