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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MkrInteractiveIcon from '../InteractiveIcon/InteractiveIcon';

@Component({ components: { MkrInteractiveIcon } })
export default class ExpansionPanel extends Vue {
  @Prop({ default: false, type: Boolean })
  defaultExpanded!: boolean;

  expanded = this.defaultExpanded;

  togglePanel(): void {
    this.expanded = !this.expanded;
  }
}
</script>

<style src="./ExpansionPanel.scss" lang="scss"></style>
