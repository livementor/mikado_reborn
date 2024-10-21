<script setup lang="ts">
import { MkrNavItem, MkrNavItemGroup, MkrNotificationBadge, MkrIcon } from '@livementor/mikado_reborn/src/components'
import { onBeforeMount, ref } from 'vue'
import ParametersTable from '@/components/ParametersTable.vue'
import PropParameters, { type MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
// @ts-ignore
import icons from '@livementor/mikado_reborn/src/utils/icons'
import SlotParameter from '@/components/Parameters/SlotParameter.vue'
import { useRouter } from 'vue-router'
import queryProps from '@/utils/queryProps'

const propsBinding = ref({});
onBeforeMount(() => {
  const query = useRouter().currentRoute.value.query
  componentProps = queryProps(componentProps, query)
})
let componentProps: MkdComponentProp = [
  { name: 'icon', type: 'select', options: icons, value: 'bell' },
  { name: 'title', type: 'text', value: 'Tooltip' },
  { name: 'active', type: 'boolean', value: true },
]

const groupPropsBinding = ref({});
const groupComponentProps: MkdComponentProp = [
  { name: 'type', type: 'select', options: ['main','sub','sub-light'] },
  { name: 'horizontal', type: 'boolean', value: false },
  { name: 'topNav', type: 'boolean', value: true },
]


const personalizedSlot = ref('Item');

</script>

<template>
  <section class="variant">
    <div>
      <h6>NavItem</h6>
      <MkrNavItemGroup>
      <MkrNavItem v-bind="propsBinding" href="#" >{{ personalizedSlot }}</MkrNavItem>
      </MkrNavItemGroup>
    </div>
    <div>
      <h6>NavItem Notification</h6>
      <div>
        <MkrNavItemGroup top-nav>
          <MkrNavItem href="#">
            <template #icon>
              <MkrNotificationBadge show>
                <MkrIcon name="book-open"/>
              </MkrNotificationBadge>
            </template>
            {{ personalizedSlot }}
          </MkrNavItem>
        </MkrNavItemGroup>
      </div>
    </div>
    <div>
      <h6>NavItemGroup</h6>
      <div>
        <MkrNavItemGroup v-bind="groupPropsBinding">
          <MkrNavItem href="#" v-bind="propsBinding" >{{ personalizedSlot }}</MkrNavItem>
          <MkrNavItem href="#" icon="book-open">Exemple 2</MkrNavItem>
          <MkrNavItem href="#" icon="chat">Dernier</MkrNavItem>
        </MkrNavItemGroup>
      </div>
    </div>
  </section>

  <ParametersTable>
    <SlotParameter v-model="personalizedSlot"></SlotParameter>
    <PropParameters :componentProps @change="propsBinding=$event"></PropParameters>
    <PropParameters :componentProps="groupComponentProps" @change="groupPropsBinding=$event"></PropParameters>
  </ParametersTable>

</template>

<style scoped lang="scss">
.mkr__nav-item:not(.mkr__nav-item--icon-only) .mkr__icon:first-child {
  margin-right: 1.5rem;
}
</style>