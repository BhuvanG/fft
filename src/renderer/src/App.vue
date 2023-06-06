<script setup>
import Navbar from './components/Navbar.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref } from 'vue'
import Preds from './components/Preds.vue'
// import axios from 'axios'
// const config = {
//   headers: {
//     'X-Auth-Token': '49185e58260b4576ab876d47977111cc'
//   }
// }
// axios.get('https://api.football-data.org/v4/competitions/DED/standings', config)
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.log(error)
//   })  

</script>

<template>
  <div class="container">
    <Navbar />
  </div>
</template>

<style lang="less">
body {

  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #181A1B;
}

.container {
  display: block;
}
</style>
