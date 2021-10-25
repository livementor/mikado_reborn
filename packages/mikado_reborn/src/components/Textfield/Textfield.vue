<template>
  <div :class="['mkr__textfield', {'error' : error}]">
    <div class="mkr__textfield__inner">
      <mkr-icon v-if="iconName" :color="iconColor" :name="iconName"/>
      <input
        :type="getType"
        @focus="focused = true"
        @blur="focused = false"
        :placeholder="placeholder"
        :value="value"
        @input="emitInput"
        @change="emitChange"
      >
      <mkr-icon v-if="error" name="exclamation-circle" color="danger" />
    </div>
    <mkr-contained-button
      v-if="type === 'password' || showPassword"
      theme="neutral"
      size="small"
      :icon="showPassword ? 'eye-off' : 'eye'"
      :color="iconColor"
      @click="showPasswordClick"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import MkrContainedButton from '../Button/Contained/ContainedButton';

@Component({
  components: {
    MkrContainedButton,
  },
})
export default class TextField extends Vue {
    @Prop({ type: String })
    value?: string;

    @Prop({ type: String })
    iconName?: string;

    @Prop({ type: String })
    placeholder?: string;

    @Prop({ type: Boolean })
    error!: boolean;

    @Prop({
      default: 'text',
      type: String,
      validator: (type) => ['text', 'email', 'password', 'date'].includes(type),
    })
    type!: string

    focused = false

    showPassword = false

    get iconColor(): string {
      if (this.focused) {
        return this.error ? 'danger' : 'secondary';
      }
      return 'neutral-60';
    }

    get getType(): string {
      if (this.showPassword) {
        return 'text';
      }
      return this.type;
    }

    showPasswordClick(): void {
      this.showPassword = !this.showPassword;
    }

    emitInput(event: Event): void {
      const input = event.target as HTMLInputElement | null;
      if (input) {
        this.$emit('input', input.value);
      }
    }

    emitChange(event: Event): void {
      const input = event.target as HTMLInputElement | null;
      if (input) {
        this.$emit('change', input.value);
      }
    }
}
</script>

<style src="./Textfield.scss" lang="scss"></style>
