<script setup lang="ts">
import { MkrChips, MkrChipsList } from '@livementor/mikado_reborn/src/components'
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
  { name: 'size', type: 'select', options: ['medium', 'small', 'square'].map(value => ({value})), value: 'medium' },
  { name: 'orientation', type: 'select', options: ['row', 'column'].map(value => ({value})) },
  { name: 'wrap', type: 'boolean' },
]

const model = ref(null);

</script>

<template>
  <section class="variant">
    <div>
      <MkrChipsList
        v-bind="propsBinding"
        v-model="model"
      >
        <MkrChips
          label="Chien"
          value="chien"
        />
        <MkrChips
          label="Chat"
          value="chat"
        />
        <MkrChips
          label="Perroquet, qui est un label plus long"
          value="perroquet"
        />
      </MkrChipsList>
    </div>
    <div>
      <MkrChipsList
        v-bind="propsBinding"
        v-model="model"
      >
        <MkrChips
          label="Chien"
          value="chien"
          icon="cog"
          illustration="freelance"
        />
        <MkrChips
          label="Chat"
          value="chat"
          icon="download"
          illustration="rse"
        />
        <MkrChips
          label="Perroquet, qui est un label plus long"
          value="perroquet"
          icon="lock-closed"
          illustration="therapeute"
        />
      </MkrChipsList>
    </div>
  </section>
  <section class="variant">
    <div>
      <MkrChipsList
        v-bind="propsBinding"
        v-model="model"
      >
        <MkrChips
          label="Chien"
          value="chien"
          icon="cog"
          illustration="freelance"
          description="Description du chien"
        />
        <MkrChips
          label="Chat"
          value="chat"
          icon="download"
          illustration="rse"
          description="Description du chat"
        />
        <MkrChips
          label="Perroquet, qui est un label plus long"
          value="perroquet"
          icon="lock-closed"
          illustration="therapeute"
          description="Description du perroquet"
        />
      </MkrChipsList>
    </div>
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="propsBinding=$event"
    />
  </ParametersTable>
</template>
