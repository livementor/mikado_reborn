<template>
  <div :class="['mkr__textarea', { error: error }]">
    <textarea
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      v-on="{
        ...$listeners,
        input: emitInputValue,
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    methods: {
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
        minlength: { type: Number },
        maxlength: { type: Number },
        placeholder: { type: String },
        error: { type: Boolean },
        rows: { type: Number }
    }
})

</script>

<style src="./Textarea.scss" lang="scss"></style>
