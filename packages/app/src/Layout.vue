<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

import { MkrApp } from '@livementor/mikado_reborn/src/components/App';
import { MkrAvatar } from '@livementor/mikado_reborn/src/components/Avatar';

// Auto import components contexts list from folder Definitions
const components = import.meta.glob('./pages/Definitions/*.vue');
const componentNames = Object.keys(components).map(path => path.split('/').pop().replace('.vue', ''));

const activeRoute = ref(null)
// screen component name through route params
watch(useRoute(), to => updateRoute(to));
const updateRoute = (route = useRoute()) => {
  activeRoute.value = route.path.split('/')
    .map(step => step == "" ? "/" : step[0].toUpperCase() + step.slice(1).toLowerCase() )
}

</script>

<template>
  <aside>
    <h1>Mika'doc <MkrAvatar src="./favicon.png" :size="3"></MkrAvatar></h1>
    <nav class="card-like">
      <ul>
        <RouterLink activeClass="active" to="/"><li>Accueil</li></RouterLink>
        <RouterLink activeClass="active" to="/installation"><li>Installation</li></RouterLink>
        <hr>
        <RouterLink v-for="name in componentNames" :key="name" :to="name.toLowerCase()" activeClass="active"><li>{{ name }}</li></RouterLink>
      </ul>
    </nav>
  </aside>

  <section>
    <header>
      <ul>
        <li v-for="(step, index) in activeRoute" :key="index">{{ step }}</li>
      </ul>
    </header>

    <MkrApp class="card-like">
      <RouterView />
    </MkrApp>

  </section>
</template>

<style scoped>
h1{
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}
.card-like {
  background-color: white;
  border: 1px solid rgba(33, 46, 59, 0.2);
  border-radius: 15px;
}
</style>