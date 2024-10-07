<template>
  <div class="mkr__expansion-panel">
    <div class="mkr__expansion-panel__header">
      <div class="mkr__expansion-panel__header-activator">
        <slot name="activator" v-bind="{ expanded, toggle: togglePanel }">
          <mkr-interactive-icon
            :name="expanded ? 'arrow-full-top' : 'arrow-full-bottom'"
            color="neutral-60"
            @click.prevent="togglePanel"
          />
        </slot>
      </div>
      <div class="mkr__expansion-panel__header-title">
        <slot name="header" v-bind="{ expanded, toggle: togglePanel }" />
      </div>
    </div>

    <div class="mkr__expansion-panel__content" v-if="$slots.content && expanded">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults } from 'vue';
import MkrInteractiveIcon from '../InteractiveIcon/InteractiveIcon.vue';

const props = withDefaults(defineProps<{ defaultExpanded: boolean }>(), { defaultExpanded: false });

const expanded = ref(props.defaultExpanded);
const togglePanel = () => { expanded.value = !expanded.value; };

</script>

<style src="./ExpansionPanel.scss" lang="scss"></style>
