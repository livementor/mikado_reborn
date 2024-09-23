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

<script lang="ts" setup>
import { defineProps } from 'vue';

interface Column {
  label: string,
  value: string,
}

defineProps<{
  title?: string,
  columns: Column[],
  items?: Array,
}>();

</script>

<style src="./DataTable.scss" lang="scss"></style>
