<template>
  <div>
    <div class="mkr__stepper">
      <!-- Header -->
      <div class="mkr__stepper-header">
        <template v-for="({ type, label }, i) in itemsAsObject">
          <!-- Header Divider -->
          <div v-if="i !== 0" :key="i" class="mkr__stepper-header__divider" />
          <!-- Header Item -->
          <div
            :key="label"
            class="mkr__stepper-header__item"
            :class="{ 'current': step === i + 1 }"
          >
          <StepperIcon
            v-if="step > i + 1 || type !== 'default'"
            :type="type"
          />
          <div v-else class="mkr__stepper-header__item-number">
            {{ i + 1 }}
          </div>
          <div class="mkr__stepper-header__item-title">
            {{ label }}
          </div>
        </div>
      </template>
    </div>
  </div>
  <!-- Body -->
  <div v-for="i in items.length" :key="i" class="mkr__stepper--body">
    <slot v-if="step === i" :name="`step_${i}`" />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    StepperIcon: () => import('./StepperIcon.vue'),
  },
    computed: {
        itemsAsObject() {
            return this.items.map((item) => {
              if (typeof item === 'string') {
                return {
                  type: 'default',
                  label: item,
                };
              }
              return item;
            });
        }
    },
    props: {
        items: { type: Array, required: true },
        step: { type: Number, default: 1 }
    }
})

</script>

<style src="./Stepper.scss" lang="scss"></style>
