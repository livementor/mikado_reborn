<template>
  <div :class="['mkr__textfield', { error: error }]">
    <div class="mkr__textfield__inner">
      <mkr-icon v-if="iconName" :color="iconColor" :name="iconName" />
      <input
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

<script lang="ts">
import MkrIcon from '../Icon/Icon.vue';
import MkrContainedButton from '../Button/Contained/ContainedButton';
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    MkrContainedButton,
    MkrIcon,
  },
  inheritAttrs: false,
    data() {
        return {
            focused: false,
            showPassword: false
        };
    },
    computed: {
        iconColor(): string {
            if (this.focused) {
              return this.error ? 'danger' : 'secondary';
            }
            return 'neutral-60';
        },
        getType(): string {
            if (this.showPassword) {
              return 'text';
            }
            return this.type;
        }
    },
    methods: {
        showPasswordClick(): void {
            this.showPassword = !this.showPassword;
        },
        emitInputValue(event: InputEvent) {
            const input = event.target as HTMLInputElement | null;

                if (input) {
                  this.$emit('input', input.value);
                }

                this.$emit('change', event);
        }
    },
    props: {
        value: { type: String },
        iconName: { type: String },
        placeholder: { type: String },
        error: { type: Boolean },
        type: {
                default: 'text',
                type: String,
                validator: (type: string) => ['text', 'email', 'password', 'date'].includes(type),
              }
    }
})

</script>

<style src="./Textfield.scss" lang="scss"></style>
