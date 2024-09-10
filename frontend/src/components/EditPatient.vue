<template>
  <div class="edit-patient-container">
    <h1 class="title">Edit Patient</h1>
    <form @submit.prevent="updatePatient" class="edit-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="patient.name" id="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input v-model="patient.age" id="age" type="number" min="0" required />
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <input v-model="patient.gender" id="gender" type="text" required />
      </div>
      <div class="buttons">
        <button type="submit" class="submit-btn">Update Patient</button>
        <button @click="$router.go(-1)" class="back-btn">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getPatientById,updatePatient as updatepatient } from '../services/patientService';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'EditPatient',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const patient = ref({
      name: '',
      age: '',
      gender: ''
    });

    const id = route.params.id;

    // Fetch patient details
    const fetchPatient = async () => {
      try {
        const response = await getPatientById(id);
        patient.value = {
          name: response.data.name,
          age: response.data.age,
          gender: response.data.gender
        };
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    // Update patient details
    const updatePatient = async () => {
      try {
        console.log('Updating patient with data:', patient.value); // Debugging line
        await updatepatient(id,{
          name: patient.value.name,
          age: String(patient.value.age),
          gender: patient.value.gender
        });
        router.push('/patientslist');
      } catch (error) {
        console.error('Error updating patient:', error);
      }
    };

    // Load patient data on component mount
    onMounted(fetchPatient);

    return {
      patient,
      updatePatient
    };
  }
};
</script>

<style scoped>
.edit-patient-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.edit-form {
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
.form-group input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.buttons {
  text-align: center;
  margin-top: 20px;
}

.submit-btn,
.back-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #fff;
  transition: background-color 0.3s;
}

.submit-btn {
  background-color: #28a745;
  margin-right: 10px;
}

.submit-btn:hover {
  background-color: #218838;
}

.back-btn {
  background-color: #6c757d;
}

.back-btn:hover {
  background-color: #5a6268;
}
</style>
