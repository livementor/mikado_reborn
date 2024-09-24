<template>
  <div :class="['mkr__textarea', { error: error }]">
    <textarea
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      v-on="{
          ...$listeners,
          change: (e) => ($emit('change', e.target.value)),
          input: (e) => ($emit('input', e.target.value)),
        }"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps<{
  value?: string,
  minlength?: number,
  maxlength?: number,
  placeholder?: string,
  error?: boolean,
  rows?: number,
}>();

</script>

<style src="./Textarea.scss" lang="scss"></style>
