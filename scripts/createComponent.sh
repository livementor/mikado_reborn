#! /bin/bash

if [ $1 ]
then

lowerName=$( echo $1 | tr '[:upper:]' '[:lower:]'} )
templateVue="<template>
  <div>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class $1 extends Vue {

  }
</script>

<style scoped>

</style>"

templateComponentIndex="import Mkr$1 from './$1.vue';

export { Mkr$1 };
export default Mkr$1;"

templateStories="import { Mkr$1 } from \"../../../mikado_reborn/src/components\";

export default {
  title: 'Components/$1',
  component: Mkr$1,
  argTypes: {

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<mkr-$lowerName v-bind=\"\$props\" />',
});

export const $1 = Template.bind({});
$1.args = {

};"

  echo "create files in mikado_reborn"
  (
    cd "./packages/mikado_reborn/src/components"
    mkdir "$1"
    cd $1
    echo "init files"

    touch "$1.vue" "index.ts" "$1.scss"
    echo "$templateVue" > $1.vue

    echo "$templateComponentIndex" > index.ts
    echo "@import '../../assets/styles/styles.scss';" > $1.scss
    echo "export * from './$1';" >> ../index.ts

    echo "create stories files"
  )
  (
    cd './packages/doc/src/stories'
    touch "$1.stories.js"
    echo "$templateStories" > "$1.stories.js"
  )
else
 echo "Name your component"
fi
