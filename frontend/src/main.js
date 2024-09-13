import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Set up router guards before mounting the app
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt');
  if (to.meta.requiresAuth && !token) {
    // Redirect to login if route requires authentication and no token is found
    next('/login');
  } else {
    // Allow navigation
    next();
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');
