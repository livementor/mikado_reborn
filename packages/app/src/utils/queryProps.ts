import { MkdComponentProp } from '@/components/Parameters/PropParameters.vue'

export default (componentProps: MkdComponentProp, query) => {
  componentProps.map(prop => {
    switch (prop.type) {
      case 'boolean': prop.value = query[prop.name] ? query[prop.name] == 'true' : prop.value;
      break;
      case 'json': prop.value = prop.value //  query[prop.name] ? decodeURI(query[prop.name]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') : prop.value;
      break;
      case 'number': prop.value = query[prop.name] ? parseInt(query[prop.name]) : prop.value;
      break;
      default: prop.value = query[prop.name] || prop.value;
    }
    return prop;
  });
  return componentProps
}