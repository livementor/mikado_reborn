import { VueConstructor } from 'vue';
import { MikadoRebornOptions } from './index.d';
import './assets/styles/framework.scss';

const MikadoReborn = {
  install(Vue: VueConstructor, args: MikadoRebornOptions = {}): void {
    const components = args.components || {};
    const componentsNames = Object.keys(components);
    componentsNames.forEach((name) => {
      const component = components[name];
      Vue.component(name, component as typeof Vue);
    });
  },
};

export default MikadoReborn;
