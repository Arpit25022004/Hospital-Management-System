<template>
  <div class="create-patient-container">
    <h1>Create New Patient</h1>
    <form @submit.prevent="createPatient">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="patient.name" id="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input v-model="patient.age" id="age" type="text" required />
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <input v-model="patient.gender" id="gender" type="text" required />
      </div>
      <div class="form-buttons">
        <button type="submit">Create Patient</button>
        <button @click='$router.go(-1)' type="button">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import {createPatient as createpatient} from '../services/patientService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'CreatePatient',
  setup() {
    const router = useRouter();
    const patient = ref({
      name: '',
      age: '',
      gender: ''
    });

    const createPatient = async () => {
      try {
        await createpatient( {
          name: patient.value.name,
          age: String(patient.value.age),
          gender: patient.value.gender
        });
        router.push('/patientslist');
      } catch (error) {
        console.error('Error creating patient:', error);
      }
    };

    return {
      patient,
      createPatient,
    };
  },
};
</script>

<style scoped>
.create-patient-container {
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

.form-group input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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
