<template>
  <div class="create-doctor-container">
    <h1>Create New Doctor</h1>
    <form @submit.prevent="createDoctor">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="doctor.name" id="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="phone_no">Phone Number:</label>
        <input v-model="doctor.phone_no" id="phone_no" type="text" required />
      </div>
      <div class="form-group">
        <label for="specializations">Specializations:</label>
        <input v-model="doctor.specializations" id="specializations" type="text" required />
      </div>
      <div class="form-group">
        <label for="status_free">Status Free:</label>
        <input v-model="doctor.status_free" id="status_free" type="checkbox" />
      </div>
      <div class="form-buttons">
        <button type="submit">Create Doctor</button>
        <button @click='$router.go(-1)' type="button">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import { createDoctor as createdoctor} from '../services/doctorService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'CreateDoctor',
  setup() {
    const router = useRouter();
    const doctor = ref({
      name: '',
      phone_no: '',
      specializations: '',
      status_free: false, // Default to false for the checkbox
    });

    const createDoctor = async () => {
      try {
        // Log data for debugging
        console.log('Creating doctor with data:', doctor.value);

        await createdoctor(doctor.value);

        // Navigate to the list page
        router.push('/doctorslist');
      } catch (error) {
        // Log the full error for debugging
        console.error('Error creating doctor:', error.response ? error.response.data : error.message);
      }
    };

    return {
      doctor,
      createDoctor,
    };
  },
};
</script>

<style scoped>
.create-doctor-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
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
.form-group input[type="checkbox"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group input[type="checkbox"] {
  width: auto;
}

.form-buttons {
  text-align: center;
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
  margin: 0 5px;
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
</style>
