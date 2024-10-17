import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'

import Layout from './Layout.vue'
import Home from '@/pages/Home.vue'
import Install from '@/pages/Install.vue'

// Auto import components contexts list from folder Definitions
const components = import.meta.glob('./pages/Definitions/*.vue');
const componentRoutes = () => Object.entries(components).map( async ([path, component]) => ({
  path: '/' + path.split('/').pop().replace('.vue', '').toLowerCase(),
  component: (await component()).default
}) )


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/installation', component: Install },
    ...await Promise.all(componentRoutes())
  ]
})

createApp(Layout).use(router).mount('#app')
