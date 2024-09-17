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

<script lang="ts">
import { defineComponent, computed, inject, ref } from 'vue';
import { ChipsListProvide } from './ChipsList.vue';
import { MkrIcon } from '../Icon';
import useUuid from '../../composables/useUuid';

export default defineComponent({
  components: {
    MkrIcon,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  setup(props: { label: string; value: string }) {
    const { generateUUID } = useUuid();
    const list = inject<ChipsListProvide>('list');
    const uuid = generateUUID();

    const componentId = computed(() => `chips-${uuid}`);
    const selected = computed(() => (list ? list.value === props.value : false));
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
          list.emitChange('');
        } else {
          list.emitChange(props.value);
        }
      }
    };

    return {
      uuid,
      componentId,
      classes,
      selected,
      selectValue,
      chipRef,
    };
  },
});
</script>

<style src="./Chips.scss" lang="scss"></style>
