import { MkdComponentProp } from '@/components/Parameters/PropParameters.vue'
import { LocationQuery } from 'vue-router'

export default (componentProps: MkdComponentProp[], query: LocationQuery) => {
  componentProps.map(prop => {
    switch (prop.type) {
      case 'boolean': prop.value = query[prop.name] ? query[prop.name] == 'true' : prop.value;
      break;
      case 'json':
        console.log('TODO: implement JSON query in queryProps.ts')//  query[prop.name] ? decodeURI(query[prop.name]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') : prop.value;
      break;
      case 'number': prop.value = query[prop.name] ? parseInt((query[prop.name]|| '').toString()) : prop.value;
      break;
      default: prop.value = <string> query[prop.name] || prop.value;
    }
    return prop;
  });
  return componentProps
}