<script setup lang="ts">
import { ref } from 'vue'
import { MkrDropdown } from '@livementor/mikado_reborn/src/components'
import PropParameters from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'

const propsBinding = ref({});
const componentProps = [
  { name: 'placeholder', type: 'text', value: 'Placeholder... ' },
  { name: 'itemInputLabel', type: 'text' },
  { name: 'error', type: 'boolean' },
]

const personalizedSlot = ref('Badge');

const value = ref(null);

const itemsWithValues = [
  { value: 'ar', label: 'Arabic' },
  { value: 'ch', label: 'Chinese' },
  { value: 'du', label: 'Dutch' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'ge', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'sp', label: 'Spanish' },
]

const personalizedItems = [
  { countryCode: 'ar', countryName: 'Arabic' },
  { countryCode: 'ch', countryName: 'Chinese' },
  { countryCode: 'du', countryName: 'Dutch' },
  { countryCode: 'en', countryName: 'English' },
  { countryCode: 'fr', countryName: 'French' },
  { countryCode: 'ge', countryName: 'German' },
  { countryCode: 'it', countryName: 'Italian' },
  { countryCode: 'ja', countryName: 'Japanese' },
  { countryCode: 'ko', countryName: 'Korean' },
  { countryCode: 'sp', countryName: 'Spanish' },
]


</script>

<template>
  <section class="variant" style="gap:30px">
    <div>
      <h6>Valeurs personnalisées</h6>
      <MkrDropdown style="width:100%" v-bind="propsBinding" v-model="value" :items="itemsWithValues">{{ personalizedSlot }}</MkrDropdown>
    </div>

    <div>
      <h6>Clés d'items personnalisées</h6>
      <MkrDropdown style="width:100%" v-bind="propsBinding"  v-model="value" :items="personalizedItems" itemLabel="countryName" itemValue="countryCode">{{ personalizedSlot }}</MkrDropdown>
    </div>
  </section>

  <ParametersTable>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
  </ParametersTable>

</template>
