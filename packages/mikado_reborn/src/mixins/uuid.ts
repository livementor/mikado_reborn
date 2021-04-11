// @nirazul https://github.com/vuejs/vue/issues/5886#issuecomment-308647738
import { Component, Vue } from 'vue-property-decorator';

let uuid = 0;

@Component
export default class Uuid extends Vue {
  uuid = ''

  created(): void {
    this.uuid = uuid.toString();
    uuid += 1;
  }
}
