<script setup lang="ts">
import { MkrCheckbox } from '@livementor/mikado_reborn/src/components'
import PropParameters from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { ref } from 'vue'

const propsBinding = ref({})
const componentProps = [
  { name: 'name', type: 'text' },
  { name: 'value', type: 'text' },
  { name: 'size', type: 'select', options: ['medium', 'small'], value: 'small' },
];

const values = ref([]);
const value = ref(null)
</script>

<template>
  <section class="variant">
    <div>
      <MkrCheckbox v-bind="propsBinding" v-model="value"></MkrCheckbox>
    </div>
    <div>
      <div style="display: flex;">
        <MkrCheckbox v-bind="propsBinding" name="checkbox1" v-model="values" />
        <MkrCheckbox v-bind="propsBinding" name="checkbox2" v-model="values" style="margin-left: 10px" />
        <MkrCheckbox v-bind="propsBinding" name="checkbox3" v-model="values" style="margin-left: 10px;" />
      </div>

      <div style="margin-top: 15px;"> {{values}} </div>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
  </ParametersTable>

</template>
