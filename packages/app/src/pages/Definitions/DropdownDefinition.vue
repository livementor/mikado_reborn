<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { MkrDropdown, type MkrDropdownItem, MkrExpansionPanel } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const propsBinding = ref({});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp[] = [
  { name: 'placeholder', type: 'text', value: 'Placeholder... ' },
  { name: 'itemInputLabel', type: 'text' },
  { name: 'error', type: 'boolean' },
]

const selectedString = ref(null);
const stringsList: MkrDropdownItem[] | string[] = ['Arabic' , 'Chinese' , 'Dutch' , 'English' , 'French' , 'German' , 'Italian' , 'Japanese' , 'Korean' , 'Spanish' ]

const selectedItem = ref(null);
const itemsList: MkrDropdownItem[] | string[] = [
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

const selectedObject = ref(null);
const objectsList: MkrDropdownItem[] | string[] = [
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


const itemsProps: MkdComponentProp[] = [
  {name: 'texts', type: 'json', value: JSON.stringify(stringsList, null, 2)},
  {name: 'items', type: 'json', value: JSON.stringify(itemsList, null, 2)},
  {name: 'objects', type: 'json', value: JSON.stringify(objectsList, null, 2)}
]
const bindingItemsList = ref({
  texts: stringsList,
  items: itemsList,
  objects: objectsList,
});

</script>

<template>
  <section
    class="variant"
    style="gap:30px"
  >
    <div>
      <h6>Liste de texte</h6>
      <MkrDropdown
        v-if="bindingItemsList.texts"
        style="width:100%"
        v-bind="propsBinding"
        v-model="selectedString"
        :items="bindingItemsList.texts"
      />
    </div>
    <div>
      <h6>Liste d'items</h6>
      <MkrDropdown
        v-if="bindingItemsList.items"
        style="width:100%"
        v-bind="propsBinding"
        v-model="selectedItem"
        :items="bindingItemsList.items"
      />
    </div>

    <div>
      <h6>Liste d'objets</h6>
      <MkrDropdown
        v-if="bindingItemsList.objects"
        style="width:100%"
        v-bind="propsBinding"
        v-model="selectedObject"
        :items="bindingItemsList.objects"
        item-label="countryName"
        item-value="countryCode"
      />
    </div>
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="propsBinding=$event"
    />
    <tr>
      <td colspan="2">
        <MkrExpansionPanel :default-expanded="false">
          <template #header>
            Types possibles pour "items"
          </template>
          <template #content>
            <table style="width: 100%">
              <tbody>
                <PropParameters
                  :component-props="itemsProps"
                  @change="bindingItemsList=$event"
                />
                <tr>
                  <td />
                  <td>
                    <p><small>Attributs pour la lecture de la liste d'objects aux valeurs personnalisées :</small></p>
                    <ul>
                      <li>itemLabel="countryName"</li>
                      <li>itemValue="countryCode"</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </MkrExpansionPanel>
      </td>
    </tr>
  </ParametersTable>
</template>
