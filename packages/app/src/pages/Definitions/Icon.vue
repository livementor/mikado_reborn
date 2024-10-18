<script setup lang="ts">
import { ref } from 'vue'
import { MkrIcon, MkrInteractiveIcon} from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
// @ts-ignore
import icons from '@livementor/mikado_reborn/src/utils/icons';
// @ts-ignore
import colors from '@livementor/mikado_reborn/src/utils/colors';

const propsBinding = ref({ name: 'bell' });
const componentProps: MkdComponentProp = [
  { name: 'name', type: 'select', options: icons, value: 'bell' },
  { name: 'color', type: 'select', options: colors },
  { name: 'theme', type: 'select', options: ['light', 'dark'], value: 'light' },
  { name: 'activated', type: 'boolean' },
]

const variantProps = {
  Icon: ['name', 'color'],
  InteractiveIcon: ['name', 'theme', 'activated'],
}


</script>

<template>
  <section class="variant">
    <div>
      <h6>Icon</h6>
      <MkrIcon v-bind="propsBinding"></MkrIcon>
    </div>
    <div>
      <h6>InteractiveIcon</h6>
      <MkrInteractiveIcon v-bind="propsBinding"></MkrInteractiveIcon>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="propsBinding=$event" :variantProps></PropParameters>
  </ParametersTable>

</template>