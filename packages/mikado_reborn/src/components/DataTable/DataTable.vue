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
import { defineComponent } from "vue";

interface Column {
  label: string,
  value: string,
}

export default defineComponent({
    props: {
        title: { type: String },
        columns: { type: Array, required: true },
        items: { type: Array }
    }
})

</script>

<style src="./DataTable.scss" lang="scss"></style>
