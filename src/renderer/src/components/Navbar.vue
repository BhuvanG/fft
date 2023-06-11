<script setup>
import { predStore } from './stores/predStore.js'
let useStore = predStore()
console.log(useStore.pred)
</script>

<template>
  <div class="navbar">
    <div class="navlink">
      <router-link to="/">Home</router-link>
    </div>
    <div class="navlink">
      <router-link to="/preds">Preds</router-link>
    </div>
    <div class="navlink">
      <router-link to="/standing">Standing</router-link>
    </div>
  </div>
  <router-view />
</template>

<style>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #0a4267;
  color: white;
  padding: 0;
  margin-bottom: 10px;
}

.navlink {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
  text-decoration: none;
  color: white;
  padding: 0;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {

  color: #0a4267;
  background-color: white;

  padding: 15px;
  transition: 0.5s;
}

a.router-link-active {
  color: #0a4267;
  background-color: white;
  padding: 15px;
  transition: 0.5s;
}
</style>