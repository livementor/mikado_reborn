<script setup lang="ts">
import { MkrCard } from '@livementor/mikado_reborn/src/components/Card'
import DemoArea from '@/components/DemoArea.vue'

const componentProps = [
  { name: 'elevated', type: 'boolean', value: true },
  { name: 'border', type: 'boolean', value: true },
  { name: 'radius', type: 'select', value: 'small', options: ['large', 'medium', 'small'] },
];

</script>

<template>
  <DemoArea :mkr="[MkrCard]" :props="componentProps" defaultSlot="Je suis une Card"></DemoArea>
</template>
