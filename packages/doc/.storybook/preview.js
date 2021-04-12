import Vue from 'vue';
import MikadoReborn from '../../mikado_reborn/src/index-core';
import * as MikadoRebornComponents from '../../mikado_reborn/src/components';

Vue.use(MikadoReborn);

// Register all components for global use without need to import in stories components
Object.keys(MikadoRebornComponents).forEach((componentName) => {
  Vue.component(componentName, MikadoRebornComponents[componentName]);
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Getting Started'],
    },
  },
}

export const decorators = [(story) => ({
  components: { story },
  template: '<mkr-app><story /></mkr-app>'
})];
