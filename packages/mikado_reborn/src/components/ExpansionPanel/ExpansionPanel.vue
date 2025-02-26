<template>
  <div class="mkr__expansion-panel">
    <div class="mkr__expansion-panel__header">
      <div class="mkr__expansion-panel__header-activator">
        <slot v-bind="{ expanded, toggle: togglePanel }" name="activator">
          <mkr-interactive-icon
            :name="expanded ? 'arrow-full-top' : 'arrow-full-bottom'"
            color="neutral-60"
            @click.prevent="togglePanel"
          />
        </slot>
      </div>
      <div class="mkr__expansion-panel__header-title">
        <slot v-bind="{ expanded, toggle: togglePanel }" name="header" />
      </div>
    </div>

    <div class="mkr__expansion-panel__content" v-if="$slots.content && expanded">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MkrInteractiveIcon from '../InteractiveIcon/InteractiveIcon.vue';
import {onMounted} from "vue";

const props = withDefaults(defineProps<{ defaultExpanded: boolean }>(), { defaultExpanded: false });
const expanded = defineModel('expanded', { required: false })

const togglePanel = () => { expanded.value = !expanded.value; };

onMounted(() => {
  if( props.defaultExpanded )
    expanded.value = true
})

</script>

<style src="./ExpansionPanel.scss" lang="scss"></style>
