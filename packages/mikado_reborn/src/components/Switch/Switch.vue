<template>
  <span
    class="mkr__switch"
    :class="{ 'mkr__switch--active': model }"
    role="checkbox"
    :aria-checked="model"
    tabindex="0"
    @click="toggle"
    @keydown.space.prevent="toggle"
  >
    <span class="mkr__switch__indicator" />
  </span>
</template>

<script lang="ts" setup>
const model = defineModel<boolean>();

const toggle = () => {
  model.value = !model.value;
};

</script>

<style src="./Switch.scss" lang="scss"></style>
