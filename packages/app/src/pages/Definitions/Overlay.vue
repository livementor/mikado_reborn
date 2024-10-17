<script setup lang="ts">
import { MkrContainedButton, MkrOverlay } from '@livementor/mikado_reborn/src/components'
import { ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters from '@/components/Parameters/PropParameters.vue'

const bindingProps = ref({});
const componentProps = [
  { name: 'color', type: 'select', options: ['dark', 'light'], value: 'dark' },
  { name: 'keepOnClick', type: 'boolean', value: false },
  { name: 'domTarget', type: 'text' },
]

const updateProps = (newConfig) => {
  delete newConfig.domTarget;
  bindingProps.value = newConfig;

}

const show = ref(false)

</script>

<template>
  <section id="frame" class="variant">
    <div>
      <MkrContainedButton @click="show=true">Afficher l'overlay</MkrContainedButton>
      <MkrOverlay v-bind="bindingProps" v-model="show"/>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="updateProps"></PropParameters>
    <p>// TODO: "apply target" button</p>
  </ParametersTable>
</template>