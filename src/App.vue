<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { onMounted, ref } from 'vue'

console.log(`Running ${OWN3D.ext.version} on ${OWN3D.ext.environment}`);

const ctx = ref({
  version: OWN3D.ext.version,
  environment: OWN3D.ext.environment,
  language: OWN3D.ext.language,
  mode: OWN3D.ext.mode,
  theme: OWN3D.ext.theme,
});

const user = ref(null);

onMounted(() => {
  OWN3D.ext.onAuthorized(async (data) => {
    console.log('On authorized', data);
    user.value = await fetch('https://id.stream.tv/api/users', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
    }).then((res) => res.json());
  });

  OWN3D.ext.onContext((context, changed) => {
    for (const key of changed) {
      ctx.value[key] = context[key];
      console.log(`Context changed ${context[key]}`);
    }
  });

  OWN3D.ext.socket.on('notifysub', (data) => {
    console.log('Got notify-sub event', data);
  });

  OWN3D.ext.socket.on('browser-source-updated', (data) => {
    console.log('Got browser-source-updated event', data);
  });
});
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
    <a href="https://dev.own3d.tv/" target="_blank">
      <img src="./assets/own3d.svg" class="logo own3d" alt="OWN3D logo"/>
    </a>
  </div>
  <HelloWorld msg="Vite + Vue + OWN3D" :context="ctx" :user="user" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.logo.own3d:hover {
  filter: drop-shadow(0 0 2em #ff9602aa);
}
</style>
