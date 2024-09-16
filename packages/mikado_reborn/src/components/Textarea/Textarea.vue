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
        input: emitInputValue,
      }"
    />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  value: string,
  minlength: number,
  maxlength: number,
  placeholder: string,
  error: boolean,
  rows: number,
}>();

const emit = defineEmits(['input', 'change'])

const emitInputValue = (event: InputEvent) => {
  const input = event.target as HTMLInputElement | null;
  if (input) {
    emit('input', input.value);
  }
  emit('change', event);
}

</script>

<style src="./Textarea.scss" lang="scss"></style>
