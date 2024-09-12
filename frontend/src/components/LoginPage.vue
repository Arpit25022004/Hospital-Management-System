<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" />
      </div>
      <div class="form-buttons">
        <button @click='$router.go(-1)' type="button">Back</button>
        <button type="submit">Login</button>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { login } from '../services/authServices';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');

    const handleSubmit = async () => {
      try {
        const payload={username: username.value, password: password.value};
        console.log('PAYLOAD:',payload);
        const state=await login(payload);
        console.log(state);
        window.location.href = '/home'; // Redirect to home page
      } catch (err) {
        error.value = 'Login failed. Please check your username and password.';
      }
    };

    return { username, password, error, handleSubmit };
  },
};
</script>

<style scoped>
.login-container {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.form-buttons button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #fff;
  transition: background-color 0.3s;
}

.form-buttons button[type="submit"] {
  background-color: #007bff;
}

.form-buttons button[type="submit"]:hover {
  background-color: #0056b3;
}

.form-buttons button[type="button"] {
  background-color: #6c757d;
}

.form-buttons button[type="button"]:hover {
  background-color: #5a6268;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
