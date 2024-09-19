<template>
  <div :class="['mkr__textfield', { error }]">
    <div class="mkr__textfield__inner">
      <mkr-icon v-if="iconName" :color="iconColor" :name="iconName" />
      <input
        :value="value"
        :type="getType"
        :placeholder="placeholder"
        v-bind="$attrs"
        @focus
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
import { computed, ref, withDefaults, defineProps, defineEmits } from 'vue';
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

const focused = ref(false);
const showPassword = ref<boolean>(false);

const toggleFocus = (e: Event) => {
  e.preventDefault();
  console.log(e);
  if( e.type == 'focus' ) focused.value = true;
  if( e.type == 'blur' ) focused.value = false;
}

const iconColor = computed<string>(() => focused.value ? (props.error ? 'danger' : 'secondary') : 'neutral-60');
const getType = computed<string>(() => showPassword.value ? 'text' : props.type);

const emit = defineEmits(['input', 'change']);

const showPasswordClick = () => { showPassword.value = !showPassword.value; };

const emitInputValue = (event: InputEvent) => {
  const input = event.target as HTMLInputElement | null;
  if (input) emit('input', input.value);
  else emit('change', event);
};

</script>

<style src="./Textfield.scss" lang="scss"></style>
