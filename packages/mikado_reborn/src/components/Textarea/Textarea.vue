<template>
  <div>
    <div
      :class="['mkr__textarea', { error: globalError }]"
    >
      <textarea
        v-model="model"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :minlength="minlength"
        :rows="rows"
        @blur="hasBeenBlurred = true"
      />
    </div>
    <div
      v-if="showCounter"
      class="mkr__counter"
      color="neutral-60"
    >
      <div
        v-if="minlength"
        :class="['mkr__counter__total', { error: globalError }]"
      >
        {{ minlength }} caractères minimum
      </div>
      <div class="mkr__counter__max">
        <span
          :class="['mkr_counter__current_length', { error: globalError }]"
        >{{ (model || '').length }}</span>
        <span v-if="maxlength">/{{ maxlength }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from 'vue';
const props = defineProps<{
  value?: string,
  minlength?: number,
  maxlength?: number,
  placeholder?: string,
  error?: boolean,
  rows?: number,
  showCounter?: boolean,
}>();
const emit = defineEmits(['input', 'change', 'valid']);

const model = defineModel<string>();

const hasBeenBlurred = ref(false);
const lengthError = computed(() => props.minlength && model.value && hasBeenBlurred.value ? model.value.length < props.minlength : false);
const globalError = computed(() => props.error || lengthError.value);

watch(globalError, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    console.log('emit.valid', newVal === false);
    emit('valid', newVal === false);
  }
});

</script>

<style src="./Textarea.scss" lang="scss"></style>
