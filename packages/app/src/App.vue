<script setup lang="ts">
import { computed, ref, shallowRef, triggerRef } from 'vue'
import { MkrApp } from '@livementor/mikado_reborn/src/components';

import Avatar from '@livementor/mikado_reborn/src/components/Avatar';
import Badge from '@livementor/mikado_reborn/src/components/Badge';

/* Components lists with props and emits details */
const componentsList = shallowRef<{ name: string, ref: string }[]>([
  { name: 'Avatar', ref: Avatar,
    props: [ { name: 'size', value: 5, type: 'number'}, { name: 'src', value: "https://randomuser.me/api/portraits/men/43.jpg" }, { name: 'alt', value: 'Hey man !' }, {name: 'style'}] },
  { name: 'Badge', ref: Badge,
    props: [ { name: 'text', value: 'Texte' }, { name: 'type', type:'select', options: ['danger', 'danger-light', 'info', 'info-light', 'primary', 'primary-light', 'secondary', 'success', 'success-light', 'warning-light', 'other-1'] }] }
])


/* magic */
const activeComponentIndex = ref(1);
const setActiveComponent = (ref: any, index: number) => {
  activeComponentIndex.value = index;
}

const componentProps = computed(() => {
  let props = {};
  componentsList.value[activeComponentIndex.value].props.map(prop => {
    props[prop.name] = prop.value;
  })
  return props
})

const updateShallowRef = () => triggerRef(componentsList);
</script>

<template>
  <aside>
    <h1>Doc-App</h1>
    <nav class="card-like">
      <h3>Liste des composants</h3>
      <ul>
        <li v-for="(component, index) in componentsList" :key="index" @click="setActiveComponent(component.ref, index)" :class="{'active': index==activeComponentIndex}">{{ component.name }}</li>
      </ul>
    </nav>
  </aside>

  <section>
    <header>
      <ul>
        <li>/</li>
        <li>{{ componentsList[activeComponentIndex].name }}</li>
      </ul>
    </header>

    <MkrApp class="card-like">
      <!-- Element Demo -->
      <component :is="componentsList[activeComponentIndex].ref" v-bind="componentProps">{{ componentProps.text }}</component>
      <!-- Personalized inputs -->
      <table v-if="componentsList[activeComponentIndex].props">
        <tr><th>Name</th><th>Value</th></tr>

        <tr v-for="prop in componentsList[activeComponentIndex].props" :key="prop.name">
          <td>{{ prop.name }}</td>
          <!-- SELECT -->
          <td v-if="prop.type=='select' && prop.options">
            <select v-model="prop.value" @change="updateShallowRef">
              <option value="" disabled>--</option>
              <option v-for="option in prop.options" :key="option" :value="option">{{ option }}</option>
            </select>
          </td>
          <!-- INPUTS -->
          <td v-else><input :type="prop.type || 'text'" v-model="prop.value" @input="updateShallowRef"></td>
        </tr>
      </table>
    </MkrApp>

  </section>
</template>

<style scoped>
table{ margin: 30px 0 0; padding: 15px; width: 100%; background: #f8f8f8 }
table th{ opacity: .8; }
table th, table td{ text-align: start; padding: 10px 0; }
table td:first-child{ font-weight: bold }
table input, table select{ padding: 10px 10px; font-size: 1.8rem; border-radius: 10px; border: 1px solid lightgray }
table input[type="text"]{ width: 600px; }
table select{ width: 300px; }
</style>
