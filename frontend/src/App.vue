<!-- src/App.vue -->
<template>
  <div id="app">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
//import NavBar from './components/NavBar.vue';
//import { isAuthenticated } from './services/authServices'; 


export default {
  name: 'App',
 // components: {
   // NavBar
  //}
  
};
</script>

<style>
/* Global styles */
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
  margin: 0;
  padding: 0;
}

main {/* Adjust based on Navbar height */
  padding: 20px;
}

/* Add any additional global styles here */
</style>
