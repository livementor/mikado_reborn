<template>
  <div :class="['mkr__textfield', { error }]">
    <div class="mkr__textfield__inner">
      <mkr-icon v-if="iconName" :color="focused?iconColor:'neutral-60'" :name="iconName" />
      <input
        :value="value"
        :type="getType"
        :placeholder="placeholder"
        v-bind="$attrs"
        @focus="focused=true"
        @blur="focused=false"
        v-on="{
          change: emitInputValue,
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
import {
  computed, ref, withDefaults,
} from 'vue';
import MkrIcon from '../Icon/Icon.vue';
import MkrContainedButton from '../Button/Contained/ContainedButton.vue';

const props = withDefaults(
  defineProps<{
    placeholder?: string,
    error?: boolean,
    type?: 'text' | 'email' | 'password' | 'date',
    iconName?: string,
    value?: string
  }>(),
  { type: 'text' },
);

const emit = defineEmits(['input', 'change']);

const showPassword = ref<boolean>(false);
const focused = ref(false);

const iconColor = computed<string>(() => (props.error ? 'danger' : 'secondary'));
const getType = computed<string>(() => (showPassword.value ? 'text' : props.type));

const showPasswordClick = () => { showPassword.value = !showPassword.value; };

const emitInputValue = (e: Event) => {
  const input = e.target as HTMLInputElement | null;
  if (input) emit('input', input.value);
  emit('change', e);
};

</script>

<style src="./Textfield.scss" lang="scss"></style>
