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
        @blur="isFocused = false"
        @focus="isFocused = true"
      />
    </div>
    <div
      v-if="showCounter"
      class="mkr__counter"
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
import { computed, watch, ref, onMounted } from 'vue';
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
const emit = defineEmits(['input', 'change', 'is-valid']);

const model = defineModel<string>();

const isFocused = ref(false);
const lengthError = computed(() => props.minlength && model.value && !isFocused.value ? model.value.length < props.minlength : false);
const globalError = computed(() => props.error || lengthError.value);

const isValid = computed(() => {
  return model.value && model.value.length >= (props.minlength || 0)
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
