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
        :class="{ 'mkr__textarea__resizable': resizable && !autosize }"
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

  const style = getComputedStyle(textarea);
  const fontSize = parseFloat(style.fontSize);

  // Récupérer et calculer le lineHeight correctement
  let lineHeight = parseFloat(style.lineHeight);
  if (isNaN(lineHeight) || style.lineHeight === 'normal') {
    // Si lineHeight est "normal", utiliser 1.2x la font-size (standard)
    lineHeight = fontSize * 1.2;
  }

  const paddingTop = parseFloat(style.paddingTop) || 0;
  const paddingBottom = parseFloat(style.paddingBottom) || 0;
  const borderTop = parseFloat(style.borderTopWidth) || 0;
  const borderBottom = parseFloat(style.borderBottomWidth) || 0;

  // Réinitialiser la hauteur pour mesurer le scrollHeight
  textarea.style.height = 'auto';
  let scrollHeight = textarea.scrollHeight;

  // Si le textarea est vide mais a un placeholder, calculer la hauteur nécessaire
  if (!model.value && props.placeholder) {
    const lines = props.placeholder.split('\n').length;
    const placeholderHeight = lines * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom;
    scrollHeight = Math.max(scrollHeight, placeholderHeight);
  }

  // Toujours utiliser minRows comme hauteur minimum (défaut: 1)
  const minHeight = (props.minRows || 1) * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom;
  // Utiliser maxRows comme hauteur maximum (défaut: aucune limite)
  const maxHeight = props.maxRows ? props.maxRows * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom : Infinity;

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
  if (props.autosize) {
    // En mode autosize, utiliser minRows comme hauteur initiale
    return props.minRows || 1;
  }
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
