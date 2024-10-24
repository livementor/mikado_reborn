<template>
  <div :class="['mkr__textarea', { error: error }]">
    <textarea
      v-model="model"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  value?: string,
  minlength?: number,
  maxlength?: number,
  placeholder?: string,
  error?: boolean,
  rows?: number,
}>();
defineEmits(['input', 'change']);

const model = defineModel<string>();

</script>

<style src="./Textarea.scss" lang="scss"></style>
