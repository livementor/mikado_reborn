<template>
  <div :class="['mkr__textfield', {'error' : error}]">
    <mkr-icon v-if="iconName" class="icon" :color="iconColor" :name="iconName"/>
    <input
      :type="getType"
      @focus="focused = true"
      @blur="focused = false"
      :placeholder="placeholder"
    >
    <mkr-icon v-if="error" name="exclamation-circle" color="danger" />
    <mkr-icon
      v-if="type === 'password' || showPassword"
      :name="showPassword ? 'eye-off' : 'eye'"
      :color="iconColor"
      @click="showPasswordClick"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { MkrIcon } from '../Icon';

@Component({
  components: {
    MkrIcon,
  },
})
export default class TextField extends Vue {
    @Prop({ type: String })
    iconName?: string;

    @Prop({ default: 'placeholder', type: String })
    placeholder!: string;

    @Prop({ type: Boolean })
    error!: boolean;

    @Prop({
      default: 'text',
      type: String,
      validator: (type) => ['text', 'email', 'password'].includes(type),
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
}
</script>

<style src="./Textfield.scss" lang="scss"></style>
