<script setup lang="ts">
import { MkrCard } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import SlotParameter from '@/components/Parameters/SlotParameter.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const propsBinding = ref({})
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp = [
  { name: 'elevated', type: 'boolean', value: true },
  { name: 'border', type: 'boolean', value: true },
  { name: 'radius', type: 'select', value: 'small', options: ['large', 'medium', 'small'] },
];

const personalizedSlot = ref('Je suis une Card');

</script>

<template>
  <section class="variant">
    <div>
      <MkrCard v-bind="propsBinding">{{ personalizedSlot }}</MkrCard>
    </div>
  </section>

  <ParametersTable>
    <SlotParameter v-model="personalizedSlot"></SlotParameter>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
  </ParametersTable>

</template>
