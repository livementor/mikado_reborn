import MikadoReborn from './framework';
import * as components from './components';

const { install } = MikadoReborn;

MikadoReborn.install = (Vue, args) => {
  install.call(MikadoReborn, Vue, {
    components,
    ...args,
  });
};

export default MikadoReborn;
