<template>
  <div :class="['mkr__textfield', { error: error }]">
    <div class="mkr__textfield__inner">
      <mkr-icon v-if="iconName" :color="iconColor" :name="iconName" />
      <input
        v-bind="$attrs"
        v-model="inputValue"
        :type="getType"
        :placeholder="placeholder"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        @keyup="onKeyup"
        @keydown="onKeydown"
        @click="onClick"
      />
      <mkr-icon v-if="error" name="exclamation-circle" color="danger" />
    </div>
    <mkr-contained-button
      v-if="type === 'password' || showPassword"
      theme="neutral"
      size="small"
      type="button"
      :icon="showPassword ? 'eye-off' : 'eye'"
      :color="iconColor"
      @click="showPasswordClick"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MkrIcon from '../Icon/Icon.vue';
import MkrContainedButton from '../Button/Contained/ContainedButton';

@Component({
  components: {
    MkrContainedButton,
    MkrIcon,
  },
  inheritAttrs: false,
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
  type!: string;

  focused = false;

  showPassword = false;

  get inputValue() {
    return this.value;
  }

  set inputValue(value: string | undefined) {
    this.$emit('input', value);
    this.$emit('change');
  }

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

  onChange(event: Event): void {
    this.$emit('change', event);
  }

  onFocus(event: Event) {
    this.focused = true;
    this.$emit('focus', event);
  }

  onBlur(event: Event) {
    this.focused = false;
    this.$emit('blur', event);
  }

  onKeydown(event: KeyboardEvent) {
    this.$emit('keydown', event);
  }

  onKeyup(event: KeyboardEvent) {
    this.$emit('keydown', event);
  }

  onClick(event: Event) {
    this.$emit('click', event);
  }
}
</script>

<style src="./Textfield.scss" lang="scss"></style>
