<script setup lang="ts">
import { type Component, onMounted, ref, shallowRef, triggerRef } from 'vue'

import ComponentVariants from '@/components/Parameters/ComponentVariants.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import SlotParameter from '@/components/Parameters/SlotParameter.vue'
import PropParameters from '@/components/Parameters/PropParameters.vue'

const { defaultSlot } = defineProps<{
  mkr: Component[],
  defaultSlot?: string,
  props?: { name: string, type: 'boolean' | 'text' | 'select', value?: boolean | string | null, options?: (string | string[])[] }[],
  variantProps?: { [key:string]: string[] },
  emits?: string[]
}>()

const personalizedSlot = ref(null);
onMounted(() => personalizedSlot.value = defaultSlot)

const propsConfig = shallowRef({});
const updateProps = (newConfig) => { console.log(newConfig); propsConfig.value = newConfig; triggerRef(propsConfig) }

</script>

<template>

  <ComponentVariants :variants="mkr" v-bind="propsConfig" :personalizedSlot></ComponentVariants>

  <ParametersTable>
    <SlotParameter v-if="defaultSlot" v-model="personalizedSlot"></SlotParameter>
    <PropParameters :componentProps="props" @change="updateProps" :variantProps="variantProps || {}"></PropParameters>
  </ParametersTable>

</template>

<style scoped lang="scss">

</style>