<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { inject, ref } from 'vue'
import { useAuth } from '@own3d/sdk/auth'
import { useContext } from '@own3d/sdk/context'
import { useSocket } from '@own3d/sdk/socket'

/**
 * @type {import('@own3d/sdk/types').Extension}
 */
const extension = inject('extension')
const { onAuthorized } = useAuth(extension)
const { onContext } = useContext(extension)
const { on } = useSocket(extension)

const user = ref(null)
const context = ref({})

onAuthorized(async (data) => {
  console.log('On authorized', data)
  user.value = await fetch('https://id.stream.tv/api/users', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${data.client_token}`,
    },
  }).then((res) => res.json())
})

onContext((_context, changed) => {
  for (const key of changed) {
    context.value[key] = _context[key]
  }
}, {immediate: true})

on('notifysub', (data) => {
  console.log('Got notify-sub event', data)
})

on('browser-source-updated', (data) => {
  console.log('Got browser-source-updated event', data)
})
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <a href="https://dev.own3d.tv/" target="_blank">
      <img src="./assets/own3d.svg" class="logo own3d" alt="OWN3D logo" />
    </a>
  </div>
  <HelloWorld v-if="user" msg="Vite + Vue + OWN3D" :context="context" :user="user" />
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
