<template>
  <div>
    <div :class="['mkr__textfield', { error: globalError, disabled }]">
      <div class="mkr__textfield__inner">
        <mkr-icon
          v-if="iconName"
          :color="isFocused?iconColor:'neutral-60'"
          :name="iconName"
        />
        <input
          v-bind="$attrs"
          v-model="model"
          :type="getType"
          :disabled="disabled"
          :placeholder="placeholder"
          @focus="isFocused=true"
          @blur="isFocused=false"
        >
        <mkr-icon
          v-if="globalError"
          name="exclamation-circle"
          color="danger"
        />
      </div>
      <mkr-contained-button
        v-if="type === 'password' || showPassword"
        theme="neutral"
        size="medium"
        type="button"
        :icon="showPassword ? 'eye-off' : 'eye'"
        :color="iconColor"
        @click="showPasswordClick"
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
import {
  computed, ref, watch, onMounted
} from 'vue';
import MkrIcon from '../Icon/Icon.vue';
import MkrContainedButton from '../Button/Contained/ContainedButton.vue';

const model = defineModel<string>();
const emit = defineEmits(['is-valid']);

const props = withDefaults(
  defineProps<{
    placeholder?: string,
    error?: boolean,
    type?: 'text' | 'email' | 'password' | 'date',
    disabled?: boolean,
    iconName?: string,
    minlength?: number,
    maxlength?: number,
    showCounter?: boolean,
  }>(),
  { type: 'text', placeholder: '', iconName: undefined, minlength: undefined, maxlength: undefined, showCounter: false },
);

const showPassword = ref<boolean>(false);

const iconColor = computed<string>(() => (props.error ? 'danger' : 'secondary'));
const getType = computed<string>(() => (showPassword.value ? 'text' : props.type));


const isFocused = ref(false);
const lengthError = computed(() => {
  const minLength = props.minlength && model.value && !isFocused.value ? model.value.length < props.minlength : false
  const maxLength = props.maxlength && model.value && !isFocused.value ? model.value.length > props.maxlength : false
  return minLength || maxLength
});
const globalError = computed(() => props.error || lengthError.value);

const showPasswordClick = () => { showPassword.value = !showPassword.value; };

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

<style src="./Textfield.scss" lang="scss"></style>
