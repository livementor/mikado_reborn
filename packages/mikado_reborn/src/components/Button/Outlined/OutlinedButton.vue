<template>
  <MkrButton
    :variant="'outlined'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </MkrButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MkrButton from '../../../mixins/Button/Button.vue';
import './OutlinedButton.scss';

export default defineComponent({
  components: { MkrButton },
});
</script>
