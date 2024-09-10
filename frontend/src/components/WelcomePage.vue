<template>
  <div class="welcome">
    <h1>Welcome</h1>
    <div class="button-container">
      <button @click="goToSignup" class="signup-button">Signup</button>
      <button @click="goToLogin" class="login-button">Login</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const goToSignup = () => {
      router.push('/signup');
    };

    const goToLogin = () => {
      router.push('/login');
    };

    return { goToSignup, goToLogin };
  },
};
</script>

<style scoped>
.welcome {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 15px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.signup-button {
  background-color: #28a745;
  color: #fff;
}

.signup-button:hover {
  background-color: #218838;
}

.login-button {
  background-color: #007bff;
  color: #fff;
}

.login-button:hover {
  background-color: #0056b3;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}
</style>
