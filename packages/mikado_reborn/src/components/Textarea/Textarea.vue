<template>
  <div class="mkr__textarea">
    <textarea
      rows="1"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :minlength="minLength"
    />
  </div>
</template>

<script lang=ts>
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class Textarea extends Vue {
    @Prop({type: Number})
    minlength: number

    @Prop({type: Number})
    maxlength: number

    @Prop({type: String})
    placeholder: string
  }
</script>

<style src="./Textarea.scss" lang="scss"></style>
