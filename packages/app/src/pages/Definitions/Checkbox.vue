<script setup lang="ts">
import { MkrCheckbox } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { ref, watch } from 'vue'

const propsBinding = ref({})
const componentProps: MkdComponentProp = [
  { name: 'name', type: 'text', value: "choix-multiple" },
  { name: 'size', type: 'select', options: ['medium', 'small'], value: 'small' },
];

const values = ref([]);
const checked = ref(false)

</script>

<template>
  <section class="variant">
    <div>
      <MkrCheckbox v-bind="propsBinding" v-model="checked"></MkrCheckbox>
    </div>
    <div>
      <div style="display: flex; gap: 15px">
        <MkrCheckbox v-model="values" v-bind="propsBinding" name="checkbox1" />
        <MkrCheckbox v-model="values" v-bind="propsBinding" name="checkbox2" />
        <MkrCheckbox v-model="values" v-bind="propsBinding" name="checkbox3" />
      </div>

      <div style="margin-top: 15px;"> {{values}} </div>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
  </ParametersTable>

</template>
