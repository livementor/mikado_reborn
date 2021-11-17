<template>
  <Component
    :is="component"
    class="mkr__list__item"
    :class="{ '--clickable': clickable }"
    v-on="{
      ...$listeners,
      click: (event) => clickable ? $emit('click', event) : undefined
    }"
  >
    <slot />
  </Component>
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

  get component() {
    return this.clickable ? 'button' : 'div';
  }
}
</script>

<style src="./ListItem.scss" lang="scss"></style>
