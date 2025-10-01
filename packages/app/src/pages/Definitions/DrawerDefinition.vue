<script setup lang="ts">
import { MkrDrawer, MkrContainedButton } from '@livementor/mikado_reborn/src/components'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import ParametersTable from '@/components/ParametersTable.vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const propsBinding = ref({
  inset: false,
  handle: true,
  closeable: true,
  overlay: true,
  dismissible: true,
});

onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})

let componentProps: MkdComponentProp[] = [
  { name: 'inset', type: 'boolean', value: false },
  { name: 'handle', type: 'boolean', value: true },
  { name: 'closeable', type: 'boolean', value: true },
  { name: 'overlay', type: 'boolean', value: true },
  { name: 'dismissible', type: 'boolean', value: true },
  { name: 'scrollable', type: 'boolean', value: true },
  { name: 'noHeader', type: 'boolean', value: false },
]

const showDrawer = ref(false);
const open = () => showDrawer.value = true

</script>

<template>
  <section class="variant">
    <div>
      <MkrDrawer
        v-bind="propsBinding"
        v-model="showDrawer"
      >
        <template #title>
          <h3>Drawer from Bottom</h3>
        </template>
        <p>This is a drawer that slides in from the bottom of the screen.</p>
        <p>You can customize its behavior using the parameters on the right.</p>
        <p>Click outside, press Escape, or use the close button to dismiss it.</p>
        <template #footer>
          <MkrContainedButton @click="showDrawer = false">
            Close
          </MkrContainedButton>
        </template>
      </MkrDrawer>

      <MkrContainedButton @click="open">
        Open Drawer
      </MkrContainedButton>
    </div>
  </section>

  <ParametersTable>
    <PropParameters
      :component-props
      @change="propsBinding=$event"
    />
  </ParametersTable>
</template>
