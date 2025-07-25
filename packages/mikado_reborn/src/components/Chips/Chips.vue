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
    <div>
      <mkr-icon
        v-if="icon"
        :name="icon"
        class="mkr__chips__icon"
      />
      <mkr-icon
        v-else-if="selected"
        name="check"
        :class="['mkr__chips__icon', 'mkr__chips__icon--selected']"
      />
      {{ label }}
    </div>
    <div
      class="mkr__chips__description"
      v-if="description"
    >
      <small>
        {{ description }}
      </small>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { MkrIcon } from '../Icon';

import { ChipsListProvide } from './ChipsList.vue';
import useUuid from '../../composables/useUuid';

const list = inject<ChipsListProvide>('list');

const { generateUUID } = useUuid();
const uuid = generateUUID();

const props = withDefaults(
  defineProps<{
    label?: string,
    value?: string,
    icon?: string,
    description?: string
  }>(),
  {
    label: '',
    value: '',
    icon: '',
    description: '',
  },
);

const componentId = computed(() => `chips-${uuid}`);
const selected = computed(() => (list ? list.model === props.value : false));
const chipRef = ref<HTMLElement | null>(null);

const classes = computed(() => [
    'mkr__chips',
    {
      'mkr__chips--selected': selected.value,
      'mkr__chips--small': list ? list.size === 'small' : false
    }
  ]);

const selectValue = () => {
  if (list) {
    if (selected.value) {
      list.updateValue('');
    } else {
      list.updateValue(props.value);
    }
  }
};

</script>

<style src="./Chips.scss" lang="scss"></style>
