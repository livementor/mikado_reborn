<template>
  <button :class="classes" @click="click">
    <mkr-icon :name="name" />
  </button>
</template>

<script lang="ts">
import { VNodeData } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MkrIcon from '../Icon/Icon.vue';
import themes from '../../utils/themes';

@Component({
  components: {
    MkrIcon,
  },
})
export default class Icon extends Vue {
  @Prop() private name!: string;

  @Prop({
    default: 'light',
    type: String,
    validator: (theme) => Object.values(themes).includes(theme),
  })
  theme!: string;

  @Prop({ default: false, type: Boolean })
  activated!: boolean;

  private class = 'mkr__interactive-icon'

  get classes(): VNodeData['class'] {
    return [
      this.class,
      `${this.class}--${this.theme}`,
      {
        [`${this.class}--${this.theme}--activated`]: this.activated,
      },
    ];
  }

  click(event: Event): void {
    this.$emit('click', event);
  }
}
</script>

<style src="./InteractiveIcon.scss" lang="scss" />
