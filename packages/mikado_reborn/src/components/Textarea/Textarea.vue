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
        :style="'resize:' + (resizable ? 'vertical' : 'none')"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>
    <div
      v-if="showCounter"
      class="mkr__counter"
      :style="!!minlength ? 'justify-content: space-between': 'justify-content: end'"
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
import { computed, watch, onMounted } from 'vue';
const props = defineProps<{
  value?: string,
  minlength?: number,
  maxlength?: number,
  placeholder?: string,
  error?: boolean,
  rows?: number,
  showCounter?: boolean,
  resizable?: boolean,
}>();
const emit = defineEmits(['input', 'change', 'is-valid', 'focus', 'blur']);

const model = defineModel<string>();

let isFocused = false;
const handleBlur = () => {
  isFocused = false
  emit('focus')
} 
const handleFocus = () => {
  isFocused = true
  emit('focus')
}

const lengthError = computed(() => props.minlength && model.value && !isFocused ? model.value.length < props.minlength : false);
const globalError = computed(() => props.error || lengthError.value);

const isValid = computed(() => {
  return !!model.value?.trim() && model.value.length >= (props.minlength || 0)
})

watch(isValid, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit('is-valid', newVal);
  }
});

onMounted(() => {
  emit('is-valid', !!isValid.value);
})

</script>

<style src="./Textarea.scss" lang="scss"></style>
