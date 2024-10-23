<script setup lang="ts">

</script>

<template>
  <div
    class="parameters"
    v-bind="$attrs"
  >
    <table>
      <thead>
        <tr>
          <th colspan="2">
            Paramètres du composant
          </th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
table{ width: 100% }
  .parameters{
    margin: 15px -15px -15px; padding: 15px; width: calc(100% + 30px); background: #f8f8f8; border-radius: 5px;
    th{ opacity: .8; text-align: start; padding: 10px 0; }
    td{
      text-align: start; padding: 10px 0;
      &:first-child{ font-weight: bold }
      &.variant div{ margin-top: 2%; margin-bottom: -1%; }
    }
    input, select, textarea{ padding: 10px 10px; font-size: 1.8rem; border-radius: 10px; border: 1px solid lightgray }
    input[type="text"], select { width: min(90%, 300px); }
    textarea { width: 100%; }
    .variant{
      display: flex; justify-content: center; align-items: center; text-align: center; height: 100%;
      div{ flex: 1 1 auto; width: 75px; }
    }
  }
</style>