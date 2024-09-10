<!-- src/components/Navbar.vue -->
<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">MyApp</router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/doctorslist" class="navbar-item">Doctors</router-link>
          <router-link to="/patientslist" class="navbar-item">Patients</router-link>
          <router-link to="/appointmentslist" class="navbar-item">Appointments</router-link>
        </div>
        <div class="navbar-end">
          <router-link to="/" class="navbar-item">Logout</router-link>

        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #060606;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin: 0;
    top: 0;
    left: 0;
    width: 99%;
    position: fixed;
    z-index: 1000;
  }
  
  .navbar-brand {
    font-size: 1.5rem;
  }
  
  .navbar-item {
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;
  }
  
  .navbar-item:hover {
    text-decoration: underline;
  }
  
  .navbar-menu {
    display: flex;
  }
  
  .navbar-start {
    display: flex;
  }
  
  .navbar-end {
    display: flex;
  }
  </style>
  