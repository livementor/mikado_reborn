<template>
  <li
    class="mkr__list__item"
    :class="{ 'mkr__list__item--clickable': clickable }"
    tabindex="-1"
    v-on="{
      click: (event) => clickable ? $emit('click', event) : undefined
    }"
  >
    <slot />
  </li>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{ clickable?: boolean }>(), { clickable: false });
defineEmits(['click']);

</script>

<style src="./ListItem.scss" lang="scss"></style>
