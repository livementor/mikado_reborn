<script setup lang="ts">
import { MkrExpansionPanel, MkrInteractiveIcon } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'
import SlotParameter from '@/components/Parameters/SlotParameter.vue'

const propsBinding = ref( {
  defaultExpanded: useRouter().currentRoute.value.query.defaultExpanded == "true" || false,
  expanded: false
});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  { name: 'defaultExpanded', type: 'boolean', value: false},
  { name: 'expanded', type: 'boolean', value: true}
]

const openTitle = ref("Titre ouvert")
const closeTitle = ref("Titre fermé")
const fixedTitle = ref("Titre constant")
const expanded = ref(false)

const updateProps = ({defaultExpanded, expanded}) => {
  propsBinding.value.defaultExpanded = defaultExpanded
  propsBinding.value.expanded = expanded
}

</script>

<template>
  <section>
    <div style="margin-bottom: 30px">
      <MkrExpansionPanel v-bind="propsBinding">
        <template #header>
          {{ fixedTitle }}
        </template>
        <template #content>
          Lorem ipsum dolor sit amet.
        </template>
      </MkrExpansionPanel>
    </div>
    <div style="margin-bottom: 30px">
      <MkrExpansionPanel v-bind="propsBinding">
        <template #activator="{expanded, toggle}">
          <MkrInteractiveIcon
            :name="expanded ? 'eye-off' : 'eye'"
            @click="toggle"
          />
        </template>
        <template #header="{expanded}">
          {{ expanded ? openTitle : closeTitle }}
        </template>
        <template #content>
          Lorem ipsum dolor sit amet.
        </template>
      </MkrExpansionPanel>
    </div>
  </section>

  <ParametersTable>
    <SlotParameter
      name="Titre constant"
      v-model="fixedTitle"
    />
    <SlotParameter
      name="Titre ouvert"
      v-model="openTitle"
    />
    <SlotParameter
      name="Titre fermé"
      v-model="closeTitle"
    />
    <PropParameters
      :component-props
      @change="updateProps"
    />
  </ParametersTable>
</template>

<style scoped lang="scss">

</style>