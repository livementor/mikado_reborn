<script setup lang="ts">
import { type Component } from 'vue'

const {variants} = defineProps<{ variants: Component[], personalizedSlot?: string }>()

</script>

<template>
  <div class="demonstration">
    <div class="variant" v-for="(variant, index) in variants" :key="index">
      <h6 v-if="variants.length > 1">{{ variant.name }}</h6>
      <component :is="variant" v-bind="$attrs">{{ personalizedSlot }}</component>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demonstration{ display: flex; margin: 15px 0 60px; }
.demonstration .variant{ flex: 1 1 auto; display:flex; flex-direction: column; align-items: center; }
.demonstration .variant h6{ margin-bottom: 15px; }
</style>