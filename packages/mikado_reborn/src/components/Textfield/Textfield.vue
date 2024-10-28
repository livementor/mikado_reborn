<template>
  <div :class="['mkr__textfield', { error }]">
    <div class="mkr__textfield__inner">
      <mkr-icon
        v-if="iconName"
        :color="focused?iconColor:'neutral-60'"
        :name="iconName"
      />
      <input
        v-bind="{...$props, ...$emit}"
        v-model="model"
        :type="getType"
        :placeholder="placeholder"
        @focus="focused=true"
        @blur="focused=false"
      >
      <mkr-icon
        v-if="error"
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
</template>

<script lang="ts" setup>
import {
  computed, ref
} from 'vue';
import MkrIcon from '../Icon/Icon.vue';
import MkrContainedButton from '../Button/Contained/ContainedButton.vue';

const model = defineModel<string>();

const props = withDefaults(
  defineProps<{
    placeholder?: string,
    error?: boolean,
    type?: 'text' | 'email' | 'password' | 'date',
    iconName?: string,
  }>(),
  { type: 'text', placeholder: '' },
);

const showPassword = ref<boolean>(false);
const focused = ref(false);

const iconColor = computed<string>(() => (props.error ? 'danger' : 'secondary'));
const getType = computed<string>(() => (showPassword.value ? 'text' : props.type));

const showPasswordClick = () => { showPassword.value = !showPassword.value; };

</script>

<style src="./Textfield.scss" lang="scss"></style>
