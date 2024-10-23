<script setup lang="ts">
import { MkrCheckbox } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const propsBinding = ref({})
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  { name: 'name', type: 'text', value: "choix-multiple" },
  { name: 'size', type: 'select', options: ['medium', 'small'].map(value => ({value})), value: 'small' },
];

const values = ref([]);
const checked = ref(false)

</script>

<template>
  <section class="variant">
    <div>
      <MkrCheckbox
        v-bind="propsBinding"
        v-model="checked"
      />
    </div>
    <div>
      <div style="display: flex; gap: 15px">
        <MkrCheckbox
          v-model="values"
          v-bind="propsBinding"
          name="checkbox1"
        />
        <MkrCheckbox
          v-model="values"
          v-bind="propsBinding"
          name="checkbox2"
        />
        <MkrCheckbox
          v-model="values"
          v-bind="propsBinding"
          name="checkbox3"
        />
      </div>

      <div style="margin-top: 15px;">
        {{ values }}
      </div>
    </div>
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="propsBinding=$event"
    />
  </ParametersTable>
</template>
