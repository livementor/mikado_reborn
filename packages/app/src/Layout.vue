<script setup lang="ts">
import { ref } from 'vue'
import { MkrApp } from '@livementor/mikado_reborn/src/components';

import Avatar from '@/pages/Contexts/Avatar.vue'
import Badge from '@/pages/Contexts/Badge.vue'
import Button from '@/pages/Contexts/Button.vue'

/* component list - aside nav list */
const componentsList = [Avatar, Badge, Button]

/* active component to display */
const activeComponentIndex = ref(2);

</script>

<template>
  <aside>
    <h1>Mika'doc</h1>
    <nav class="card-like">
      <ul>
        <RouterLink activeClass="active" to="/"><li>Accueil</li></RouterLink>
        <RouterLink activeClass="active" to="/installation"><li>Installation</li></RouterLink>
        <hr>
        <RouterLink activeClass="active" to="/avatar"><li>Avatar</li></RouterLink>
        <RouterLink activeClass="active" to="/badge"><li>Badge</li></RouterLink>
        <RouterLink activeClass="active" to="/button"><li>Button</li></RouterLink>
      </ul>
    </nav>
  </aside>

  <section>
    <header>
      <ul>
        <li>/</li>
        <li>{{ componentsList[activeComponentIndex]?.__name }}</li>
      </ul>
    </header>

    <MkrApp class="card-like">
      <RouterView />
    </MkrApp>

  </section>
</template>

<style scoped>
.card-like{
  background-color: white;
  border: 1px solid rgba(33, 46, 59, 0.2);
  border-radius: 15px;
}
</style>