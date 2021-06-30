<template>
  <div class="mkr__app">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  created(): void {
    Vue.prototype.$app = this;
  }
}
</script>

<style src="./App.scss" lang="scss"></style>
