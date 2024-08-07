<template>
  <li
    :id="componentId"
    :class="classes"
    role="option"
    tabindex="-1"
    :aria-selected="selected"
    @click="selectValue"
  >
    <mkr-icon v-if="selected" name="check" />
    {{ label }}
  </li>
</template>

<script lang="ts">
import {
  defineComponent, computed, inject, onBeforeUnmount, onMounted, ref,
} from 'vue';
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
    const list = inject<ChipsListProvide>('list', undefined);
    const uuid = generateUUID(); // Assurez-vous que Uuid a une méthode pour générer l'UUID
    const componentId = computed(() => `chips-${uuid}`);
    const selected = computed(() => (list ? list.value === props.value : false));

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

    onMounted(() => {
      if (list) {
        list.registerChips({ uuid, props });
      }
    });

    onBeforeUnmount(() => {
      if (list) {
        list.unregisterChips(uuid);
      }
    });

    return {
      componentId,
      classes,
      selected,
      selectValue,
    };
  },
});
</script>

<style src="./Chips.scss" lang="scss"></style>
