<template>
  <div :class="['mkr__textfield', { error: error }]">
    <div class="mkr__textfield__inner">
      <mkr-icon v-if="iconName" :color="iconColor" :name="iconName" />
      <input
        @focus="focused=true"
        @blur="focused=false"
        v-bind="$attrs"
        :value="value"
        :type="getType"
        :placeholder="placeholder"
        v-on="{
          ...$listeners,
          input: emitInputValue,
        }"
      />
      <mkr-icon v-if="error" name="exclamation-circle" color="danger" />
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
</template>

<script lang="ts" setup>
import MkrIcon from '../Icon/Icon.vue';
import MkrContainedButton from '../Button/Contained/ContainedButton.vue';
import { computed, ref } from 'vue';

const focused = ref<boolean>(false)
const showPassword = ref<boolean>(false)

const props = withDefaults(
  defineProps<{
    value: string,
    iconName: string,
    placeholder: string,
    error: boolean,
    type: 'text' | 'email' | 'password' | 'date',
  }>(),
  { type: 'text' } );

const emit = defineEmits(['input', 'change']);

const iconColor = computed<string>(() => focused.value ? (props.error ? 'danger' : 'secondary') : 'neutral-60');
const getType = computed<string>(() => showPassword.value ? 'text' : props.type);

const showPasswordClick = () => {
    showPassword.value = !showPassword.value;
  };

const emitInputValue = (event: InputEvent) => {
  const input = event.target as HTMLInputElement | null;
  if (input) emit('input', input.value);
  else emit('change', event);
};

</script>

<style src="./Textfield.scss" lang="scss"></style>
