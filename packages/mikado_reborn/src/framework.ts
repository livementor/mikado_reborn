import { VueConstructor } from 'vue';
import './assets/styles/framework.scss';
import { MikadoRebornOptions } from './index.d';

export default class MikadoReborn {
  static install(Vue: VueConstructor, args: MikadoRebornOptions = {}): void {
    const components = args.components || {};
    const componentsNames = Object.keys(components);
    componentsNames.forEach((name) => {
      const component = components[name];
      Vue.component(name, component as typeof Vue);
    });
  }
}
