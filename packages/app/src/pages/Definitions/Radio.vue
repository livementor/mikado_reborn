<script setup lang="ts">
import { MkrRadio, MkrRadioGroup } from '@livementor/mikado_reborn/src/components'
import { ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters from '@/components/Parameters/PropParameters.vue'

const bindingProps = ref({});
const componentProps = [
  { name: 'name', type: 'text', value: 'animal' },
  { name: 'required', type: 'boolean', value: false },
]

const model = ref(null);

</script>

<template>
<section class="variant">
  <div>
    <MkrRadioGroup name="test" v-bind="bindingProps" v-model="model">
      <MkrRadio label="Chien" value="chien"/>
      <MkrRadio label="Chat" value="chat"/>
      <MkrRadio label="Perroquet" value="perroquet"/>
    </MkrRadioGroup>
  </div>
</section>

  <ParametersTable>
    <PropParameters :componentProps @change="bindingProps=$event"></PropParameters>
  </ParametersTable>

</template>