/* eslint-disable no-shadow */
import App from './components/App';

declare module 'vue/types/vue' {
  interface Vue {
    $app: App;
  }
}
