<template>
  <span
    class="mkr__switch"
    :class="{ 'mkr__switch--active': value }"
    role="checkbox"
    :aria-checked="value"
    tabindex="0"
    @click="toggle"
    @keydown.space.prevent="toggle"
  >
    <span class="mkr__switch__indicator" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MkrSwitch',
  methods: {
    toggle(): void {
      this.$emit('change', !this.value);
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: { type: Boolean },
  },
});

</script>

<style src="./Switch.scss" lang="scss"></style>
