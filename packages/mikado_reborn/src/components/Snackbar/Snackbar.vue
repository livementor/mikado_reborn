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

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const show = ref(true);
const props = withDefaults(
  defineProps<{
    message: string,
    error?: boolean,
    success?: boolean,
    neutral?: boolean,
    closable?: boolean,
    timeout: number,
  }>(),
  { closable: false, timeout: 5000 }
);

const emit = defineEmits(['close']);

const close = (event?: Event) => {
  show.value = false;
  emit('close', event);
}

const click = (event: Event) => {
  if (props.closable) close(event);
}

onMounted(() => {
  if (props.timeout > 0) {
    setTimeout(
      () => { if (show.value) { close() } },
      props.timeout
    );
  }
})

</script>

<style src="./Snackbar.scss" lang="scss"></style>
