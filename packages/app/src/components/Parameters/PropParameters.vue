<script setup lang="ts">
import { onMounted } from 'vue'
import { MkrIcon } from '@livementor/mikado_reborn/src/components/Icon'
import ListInput from '@/components/Parameters/Inputs/ListInput.vue'
import BooleanInput from '@/components/Parameters/Inputs/BooleanInput.vue'

const { componentProps } = withDefaults( defineProps<{ componentProps: {
    name: string,
    type: 'boolean' | 'text' | 'select',
    value?: boolean | string | null,
    options?: (string | string[])[]
  }[],
  variantProps?: { [key:string]: string[] } }>(), { variantProps: {} });

const emit = defineEmits(['change'])

const updateProps = () => {
  // transform componentProps table into a v-bind-friendly configuration
  const propsConfig = componentProps.reduce((a, v) => (v.value ? {...a, [v.name]: v.value } : {...a}), {})
  emit('change', propsConfig);
}

// init component props
onMounted(() => updateProps() );

</script>

<template>
  <tr>
    <th colspan="2">Props</th>
    <th class="compliance" v-for="variant in Object.keys(variantProps)" :key="variant">{{ variant }}</th>
  </tr>
  <tr v-for="(prop, index) in componentProps" :key="index">
    <td>"{{ prop.name }}"</td>
    <td>
      <!-- prop.value is edited from the component ; updateProps only called as a v-bind-friendly builder -->
      <ListInput v-if="prop.type=='select'" :list="prop.options" v-model="prop.value" @update="updateProps"></ListInput>
      <input v-else-if="prop.type=='text'" type="text" v-model="prop.value" @input="updateProps">
      <input v-else-if="prop.type=='number'" type="number" v-model="prop.value" @input="updateProps">
      <BooleanInput v-else-if="prop.type=='boolean'" v-model="prop.value" @update="updateProps"></BooleanInput>
    </td>
    <!-- variantProps -->
    <td class="compliance" v-for="(propNames, index) in Object.values(variantProps)" :key="index">
      <MkrIcon v-if="propNames.includes(prop.name)" name="check"/>
      <MkrIcon v-else name="cross"/>
    </td>
  </tr>
</template>

<style scoped lang="scss">
.compliance{
  text-align: center;
  .mkr__icon {
    font-size: 1.5rem;
    &.icon-check { color: mediumseagreen }
    &.icon-cross { opacity: 0.2; }
  }
}
</style>