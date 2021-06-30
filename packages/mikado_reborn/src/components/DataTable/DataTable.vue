<template>
  <table class="mkr__data-table">
    <caption>{{ title }}</caption>
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.value"
          v-text="column.label"
        />
      </tr>
    </thead>
    <tbody v-if="items">
      <tr v-for="(item, index) in items" :key="index">
        <td
          v-for="column in columns"
          :key="`${column.value}-${index}`"
          v-text="item[column.value]"
        />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

interface Column {
  label: string,
  value: string,
}

@Component
export default class DataTable extends Vue {
  @Prop({ type: String })
  title?: string

  @Prop({ type: Array, required: true })
  columns!: Column[]

  @Prop({ type: Array })
  items?: Record<string, unknown>[]
}
</script>

<style src="./DataTable.scss" lang="scss"></style>
