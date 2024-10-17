<template>
  <li
    :id="componentId"
    :class="classes"
    role="option"
    tabindex="-1"
    :aria-selected="selected"
    @click="selectValue"
    ref="chipRef"
  >
    <mkr-icon v-if="selected" name="check" />
    {{ label }}
  </li>
</template>

<script lang="ts" setup>
import {
  computed, inject, ref, withDefaults,
} from 'vue';
import { MkrIcon } from '../Icon';

import { ChipsListProvide } from './ChipsList.vue';
import useUuid from '../../composables/useUuid';

const list = inject<ChipsListProvide>('list');

const { generateUUID } = useUuid();
const uuid = generateUUID();

const model = defineModel('');

const props = withDefaults(
  defineProps<{ label?: string }>(),
  { label: '' },
);

const componentId = computed(() => `chips-${uuid}`);
const selected = computed(() => (list ? list.value === model.value : false));
const chipRef = ref<HTMLElement | null>(null);

const classes = computed(() => [
  'mkr__chips',
  {
    'mkr__chips--selected': selected.value,
    'mkr__chips--small': list ? list.size === 'small' : false,
  },
]);

const selectValue = () => {
  if (list) {
    if (selected.value) {
      list.emitInput('');
    } else {
      list.emitInput(model.value);
    }
  }
};

</script>

<style src="./Chips.scss" lang="scss"></style>
