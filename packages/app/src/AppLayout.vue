<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

import { MkrApp, MkrAvatar } from '@livementor/mikado_reborn/src/components';

// Auto import components contexts list from folder Definitions
const components = import.meta.glob('./pages/Definitions/*.vue');
const componentNames = Object.keys(components).map(path => {
  const fileName = path.split('/').pop() || '';
  return fileName.replace('Definition.vue', '')
});

const activeRoute = ref<Array<string>>([])
// screen component name through route params
watch(useRoute(), to => updateRoute(to));
// update Ariane's line with current route
const updateRoute = (route = useRoute()) => {
  activeRoute.value = route.path.split('/')
}

</script>

<template>
  <aside>
    <h1>
      Mika'doc <MkrAvatar
        src="./favicon.png"
        :size="3"
      />
    </h1>
    <nav class="card-like">
      <ul>
        <RouterLink
          active-class="active"
          to="/"
        >
          <li>Accueil</li>
        </RouterLink>
        <RouterLink
          active-class="active"
          to="/installation"
        >
          <li>Installation</li>
        </RouterLink>
        <li class="disabled">
          <hr>
        </li>
        <RouterLink
          v-for="name in componentNames"
          :key="name"
          :to="name.toLowerCase()"
          active-class="active"
        >
          <li>{{ name }}</li>
        </RouterLink>
      </ul>
    </nav>
  </aside>

  <section>
    <header>
      <ul>
        <li
          v-for="(step, index) in activeRoute"
          :key="index"
        >
          {{ $filters.titleCase(step) }}
        </li>
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
  overflow-y: scroll;
  background-color: white;
  border: 1px solid rgba(33, 46, 59, 0.2);
  border-radius: 15px;
}
</style>