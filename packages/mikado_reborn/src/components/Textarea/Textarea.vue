<template>
  <div>
    <div
      :class="['mkr__textarea', { error: globalError }]"
    >
      <textarea
        ref="textareaRef"
        v-model="model"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :minlength="minlength"
        :rows="computedRows"
        :style="'resize:' + (props.autosize || !resizable ? 'none' : 'vertical')"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="emit('input', $event)"
        @change="emit('change', $event)"
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
import { computed, watch, onMounted, ref, nextTick } from 'vue';
const props = defineProps<{
  value?: string,
  minlength?: number,
  maxlength?: number,
  placeholder?: string,
  error?: boolean,
  rows?: number,
  showCounter?: boolean,
  resizable?: boolean,
  autosize?: boolean,
  minRows?: number,
  maxRows?: number,
}>();
const emit = defineEmits(['input', 'change', 'is-valid', 'focus', 'blur']);

const model = defineModel<string>();
const textareaRef = ref<HTMLTextAreaElement>();

const isFocused = ref(false);
const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}
const handleFocus = () => {
  isFocused.value = true
  emit('focus')
}

const adjustHeight = () => {
  if (!props.autosize || !textareaRef.value) return;

  const textarea = textareaRef.value;
  textarea.style.height = 'auto';

  const style = getComputedStyle(textarea);
  const lineHeight = parseInt(style.lineHeight);
  const paddingTop = parseInt(style.paddingTop);
  const paddingBottom = parseInt(style.paddingBottom);

  let scrollHeight = textarea.scrollHeight;

  // Si le textarea est vide mais a un placeholder, calculer la hauteur nécessaire
  if (!model.value && props.placeholder) {
    const lines = props.placeholder.split('\n').length;
    const placeholderHeight = lines * lineHeight + paddingTop + paddingBottom;
    scrollHeight = Math.max(scrollHeight, placeholderHeight);
  }

  const minHeight = props.minRows ? props.minRows * lineHeight + paddingTop + paddingBottom : scrollHeight;
  const maxHeight = props.maxRows ? props.maxRows * lineHeight + paddingTop + paddingBottom : Infinity;

  const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
  textarea.style.height = `${newHeight}px`;
  textarea.style.overflow = scrollHeight > maxHeight ? 'auto' : 'hidden';
}

const lengthError = computed(() => props.minlength && model.value && !isFocused.value ? model.value.length < props.minlength : false);
const globalError = computed(() => props.error || lengthError.value);

const isValid = computed(() => {
  return !!model.value?.trim() && model.value.length >= (props.minlength || 0)
})

const computedRows = computed(() => {
  if (props.autosize) return undefined;
  return props.rows;
});

watch(isValid, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit('is-valid', newVal);
  }
});

watch(model, () => {
  if (props.autosize) {
    nextTick(() => adjustHeight());
  }
});

onMounted(() => {
  emit('is-valid', !!isValid.value);
  if (props.autosize) {
    nextTick(() => adjustHeight());
  }
})

</script>

<style src="./Textarea.scss" lang="scss"></style>
