<template>
  <div class="home" v-if ="isAuthenticated()">
    <NavBar />
    <main>
      <div class="content">
        <h1>Welcome to the Hospital Management System</h1>
        <nav>
          <router-link to="/doctorslist" class="nav-link">Doctors</router-link>
          <router-link to="/patientslist" class="nav-link">Patients</router-link>
          <router-link to="/appointmentslist" class="nav-link">Appointments</router-link>
        </nav>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
  name: 'HomeComp',
  components: {
    NavBar
  },
  methods:{
    isAuthenticated(){
      const token = localStorage.getItem('jwt');
      return token !== null;
    }
  }
};
</script>

<style scoped>
.home {
  font-family: Arial, sans-serif;
}

main {
  margin-top: 60px; /* Adjust based on NavBar height */
  padding: 20px;
}

.content {
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 2.5rem;
  color: #333;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #42b983;
  font-size: 1.2rem;
}

.nav-link:hover {
  text-decoration: underline;
  color: #36a15a;
}
</style>
