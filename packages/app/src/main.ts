import './assets/main.css'

import { type Component, createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'

import Layout from './AppLayout.vue'
import Home from '@/pages/Home.vue'
import Install from '@/pages/Install.vue'

// Auto import components contexts list from folder Definitions
const components = import.meta.glob('./pages/Definitions/*.vue');
const componentRoutes = () => Object.entries(components).map( async ([path, component]: [string, () => Promise<unknown>]) => {
  const fileName: string = path.split('/').pop() || '';
  return {
    path: '/' + fileName.replace('Definition.vue', '').toLowerCase(),
    component: <Component> (<{ default: Component }> await component()).default
  }})


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/installation', component: Install },
    ...await Promise.all(componentRoutes())
  ]
})

createApp(Layout).use(router).mount('#app');
