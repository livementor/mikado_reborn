<template>
  <div
      :class="[
        'mkr__snackbar',
        show ? 'mkr__snackbar--show' : 'mkr__snackbar--hidden',
        {
          'mkr__snackbar--error': error,
          'mkr__snackbar--neutral': neutral,
          'mkr__snackbar--success' : success,
          'mkr__snackbar--closable': closable,
        }]"
        @click="click">
    <span>{{ message }}</span>
    <mkr-icon v-if="closable" name="cross" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MkrIcon } from '../Icon';

export default defineComponent({
  components: {
    MkrIcon,
  },
  data() {
    return {
      show: true,
    };
  },
  mounted(): void {
    if (this.timeout > 0) {
      setTimeout(() => {
        if (this.show) {
          this.close();
        }
      }, this.timeout);
    }
  },
  methods: {
    click(event: Event): void {
      if (this.closable) {
        this.close(event);
      }
    },
    close(event?: Event): void {
      this.show = false;
      this.$emit('close', event);
    },
  },
  props: {
    message: { type: String, required: true },
    error: { type: Boolean },
    success: { type: Boolean },
    neutral: { type: Boolean },
    closable: { type: Boolean, default: false },
    timeout: { type: Number, default: 5000 },
  },
});

</script>

<style src="./Snackbar.scss" lang="scss"></style>
