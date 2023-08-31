<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
  context: Object,
  user: Object,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div v-if="user">
    <img class="user-avatar" :src="user.avatar_url" :alt="user.name">
    <div class="user-greeting">Hello {{ user.name }}!</div>
  </div>
  <div v-else class="user-auth">
    Waiting for user authorization...
  </div>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <pre class="ext-context">{{ JSON.stringify(context, null, 2) }}</pre>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>

  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.user-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}
.user-greeting {
  font-size: 1.5rem;
  font-weight: bold;
}
.user-auth {
  color: #ff9602;
}
.ext-context {
  background: #2a3034;
  color: #fff;
  padding: 1rem;
  border-radius: 12px;
  text-align: left;
  margin-top: -2em;
  margin-bottom: 2em;
}
.read-the-docs {
  color: #888;
}
</style>
