<template>
  <div>

    <div :class="['mkr__textfield', {'error' : error}]">
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
      <mkr-icon
        v-if="type === 'password' || showPassword"
        :name="showPassword ? 'eye-off' : 'eye'"
        :color="iconColor"
        @click="showPasswordClick"
      />
    </div>
    <mkr-stepped-progress
      v-if="showPasswordStrenght"
      :steps="3"
      :color="strenghColor"
      :progress="passwordScore" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { zxcvbn, ZxcvbnOptions } from '@zxcvbn-ts/core';
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import zxcvbnFrPackage from '@zxcvbn-ts/language-fr';
import { MkrSteppedProgress } from '../SteppedProgress';
import { MkrIcon } from '../Icon';

const options = {
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnFrPackage.dictionary,
  },
  translations: zxcvbnFrPackage.translations,
};

ZxcvbnOptions.setOptions(options);

@Component({
  components: {
    MkrIcon,
    MkrSteppedProgress,
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
    showPasswordStrenght!:boolean

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

    get passwordScore(): number {
      return zxcvbn(this.value || '').score;
    }

    get strenghColor() : string {
      switch (this.passwordScore) {
        case 1:
          return 'danger';
        case 2:
          return 'primary';
        case 3:
          return 'secondary';
        default:
          return 'secondary';
      }
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
