<template>
  <span class="mkr__icon" :class="classNames" @click="click"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    computed: {
        classNames(): string[] {
            const classes = [];
            if (this.color) classes.push(this.color);
            if (this.name) classes.push(`icon-${this.name}`);
            return classes;
        }
    },
    methods: {
        click(event: Event): void {
            this.$emit('click', event);
        }
    },
    props: {
        name: { required: true, type: String },
        color: { default: undefined, type: String }
    }
})

</script>
<style src="./Icon.scss" lang="scss"></style>
