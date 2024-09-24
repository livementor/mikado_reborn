<template>
  <div :class="['mkr__textfield', { error }]">
    <div class="mkr__textfield__inner">
      <mkr-icon v-if="iconName" :color="iconColor" :name="iconName" />
      <input
        :value="value"
        :type="getType"
        :placeholder="placeholder"
        v-bind="$attrs"
        @focus="focused=true"
        @blur="focused=false"
        v-on="{
          ...$listeners,
          change: (e) => ($emit('change', e.target.value)),
          input: (e) => ($emit('input', e.target.value)),
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
  computed, ref, withDefaults, defineProps,
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

const showPassword = ref<boolean>(false);
const focused = ref(false);

// eslint-disable-next-line no-nested-ternary
const iconColor = computed<string>(() => (focused.value ? (props.error ? 'danger' : 'secondary') : 'neutral-60'));
const getType = computed<string>(() => (showPassword.value ? 'text' : props.type));

const showPasswordClick = () => { showPassword.value = !showPassword.value; };

</script>

<style src="./Textfield.scss" lang="scss"></style>
