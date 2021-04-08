<template>
  <div :class="['mkr__textfield', {'error' : error}]">
    <mkr-icon v-if="iconName" class="icon" :color="iconColor" :name="iconName"/>
    <input :type="type" @focus="focused = true" @blur="focused = false" :placeholder="placeholder">
    <mkr-icon v-if="error" name="exclamation-circle" color="danger" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class TextField extends Vue {
    @Prop()
    iconName?: string;

    @Prop({type: String})
    placeholder: string;

    @Prop({type: Boolean})
    error: boolean;

    @Prop({
      type: String,
      validator: (x) => { return ['text', 'email', 'password'].includes(x)}
    })
    type: string
    focused: boolean = false

    get iconColor () {
       if (this.focused) {
         return this.error ? 'danger' : 'secondary'
       }
        return 'neutral-60'

    }
  }
</script>

<style src="./Textfield.scss" lang="scss"></style>
