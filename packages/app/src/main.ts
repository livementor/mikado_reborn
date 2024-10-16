import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'

import Layout from './Layout.vue'
import Home from '@/pages/Home.vue'
import Install from '@/pages/Install.vue'
import Avatar from '@/pages/Contexts/Avatar.vue'
import Badge from '@/pages/Contexts/Badge.vue'
import Button from '@/pages/Contexts/Button.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/installation', component: Install },
  { path: '/avatar', component: Avatar },
  { path: '/badge', component: Badge },
  { path: '/button', component: Button },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(Layout).use(router).mount('#app')
