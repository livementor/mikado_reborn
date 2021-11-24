<template>
  <li
    class="mkr__list__item"
    :class="{ 'mkr__list__item--clickable': clickable }"
    tabindex="-1"
    v-on="{
      ...$listeners,
      click: (event) => clickable ? $emit('click', event) : undefined
    }"
  >
    <slot />
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListItem extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  clickable!: boolean
}
</script>

<style src="./ListItem.scss" lang="scss"></style>
