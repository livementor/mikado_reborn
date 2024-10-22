<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { MkrIcon } from '@livementor/mikado_reborn/src/components/Icon'
import ListInput from '@/components/Parameters/Inputs/ListInput.vue'
import BooleanInput from '@/components/Parameters/Inputs/BooleanInput.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

export type MkdComponentProp = {
  name: string,
  type: 'boolean' | 'text' | 'select' | 'textarea' | 'json' | 'number',
  value?: number | boolean | string,
  options?: (string | string[] | { isGroupName: boolean, mkr: string[] })[],
  valid?: boolean,
}[];

const { componentProps, variantProps } = defineProps<{
  componentProps: MkdComponentProp,
  variantProps?: object,
}>();

const emit = defineEmits(['change'])

const router = useRouter()

const updateProps = () => {
  // transform componentProps table into a v-bind-friendly configuration
  const propsConfig = componentProps.reduce((a, v) => (v.value !== undefined ? {...a, [v.name]: (v.type=='json' ? ( v.valid !== false ? JSON.parse(v.value) : []) : v.value) } : {...a}), {})
  // apply to url params
  router.replace({ query: propsConfig })
  // emit to component's variants
  emit('change', propsConfig);
}

// init component props
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  const queryComponentProps = queryProps(componentProps, query)
  componentProps.map(prop => queryComponentProps.find(query => query.name == prop.name));
  updateProps();
});

const isValidJSONProp = (prop: object) => {
  try{
    JSON.parse(prop.value);
    prop.valid = true;
    return true
  } catch (e){
    console.log(e)
    prop.valid = false;
    return false;
  }
}

const variantNames = computed( () => {
  return variantProps ? Object.keys(variantProps) : []
})

// TEST BOOLEAN
const testBool = ref()
</script>

<template>
  <tr>
    <th colspan="2">Props</th>
    <th class="compliance" v-for="variant in variantNames" :key="variant">{{ variant }}</th>
  </tr>
  <tr v-for="(prop, index) in componentProps" :key="index">
    <td>"{{ prop.name }}"</td>
    <td>
      <!-- prop.value is edited from the component ; updateProps only called as a v-bind-friendly builder -->
      <ListInput v-if="prop.type=='select'" :list="prop.options" v-model="prop.value" @update:modelValue="updateProps"></ListInput>
      <input v-else-if="prop.type=='text'" type="text" v-model="prop.value" @input="updateProps">
      <input v-else-if="prop.type=='number'" type="number" v-model="prop.value" @input="updateProps">
      <textarea v-else-if="prop.type=='json'" v-model="prop.value" @input="isValidJSONProp(prop)" @change="updateProps" :class="{'error': prop.valid === false}"/>
      <textarea v-else-if="prop.type=='textarea'" v-model="prop.value" @input="updateProps" />
      <BooleanInput v-else-if="prop.type=='boolean'" v-model="prop.value" @update:modelValue="updateProps"></BooleanInput>
    </td>
    <!-- variantProps -->
    <td class="compliance" v-for="(propNames, index) in variantProps" :key="index">
      <MkrIcon v-if="propNames.includes(prop.name)" name="check"/>
      <MkrIcon v-else name="cross"/>
    </td>
  </tr>
</template>

<style scoped lang="scss">
textarea.error{ border-color: red; }
</style>
