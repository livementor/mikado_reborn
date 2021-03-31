<template>
    <button>{{label}}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() private label!: string;
}
</script>
<style src="./Button.scss" lang="scss"></style>
