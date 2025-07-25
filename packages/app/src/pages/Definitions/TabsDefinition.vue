<script setup lang="ts">
import { MkrTab, MkrTabList } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const propsBinding = ref({})
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  // { name: 'name', type: 'text' },
  { name: 'size', type: 'select', options: [ 'medium', 'large'].map(value => ({value})), value: 'large' },
]

const model = ref(null);

</script>

<template>
  <section class="variant">
    <div>
      <MkrTabList
        v-bind="propsBinding"
        v-model="model"
      >
        <MkrTab
          label="Chien"
          value="chien"
        />
        <MkrTab
          label="Chat"
          value="chat"
        />
        <MkrTab
          label="Perroquet, qui est un label plus long"
          value="perroquet"
        />
        <MkrTab
          label="Désactivé"
          value="disabled"
          disabled
        />
      </MkrTabList>
    </div>
  </section>

  <section>
    <div style="display: flex; flex-direction: row; gap: 1rem;">
      Valeur : <pre>{{ model }}</pre>
    </div>
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="propsBinding=$event"
    />
  </ParametersTable>
</template>
