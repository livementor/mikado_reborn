<template>
  <div :class="['mkr__textarea', { error: error }]">
    <textarea
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      v-on="{
         change: (e) => ($emit('change', e.target.value)),
         input: (e) => ($emit('input', e.target.value)),
       }"
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

</script>

<style src="./Textarea.scss" lang="scss"></style>
