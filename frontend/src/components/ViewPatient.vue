<template>
  <div class="patient-details-container">
    <h1 class="title">Patient Details</h1>
    <div class="patient-details">
      <p><strong>ID:</strong> {{ patient.id }}</p>
      <p><strong>Name:</strong> {{ patient.name }}</p>
      <p><strong>Age:</strong> {{ patient.age }}</p>
      <p><strong>Gender:</strong> {{ patient.gender }}</p>
    </div>
    <div class="buttons">
      <button @click="editPatient" class="edit-btn">Edit</button>
      <button @click="$router.go(-1)" class="back-btn">Back</button>
    </div>
  </div>
</template>

<script>
import { getPatientById } from '../services/patientService';

export default {
  name: 'ViewPatient',
  data() {
    return {
      patient: {}
    };
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      const response = await getPatientById(id);
      this.patient = response.data;
    } catch (error) {
      console.error('Failed to fetch patient:', error);
    }
  },
  methods: {
    editPatient() {
      this.$router.push(`/edit-patient/${this.patient.id}`);
    }
  }
};
</script>

<style scoped>
.patient-details-container {
  padding: 20px;
  max-width: 800px;
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

.patient-details {
  margin-bottom: 20px;
}

.patient-details p {
  font-size: 1.1rem;
  margin: 10px 0;
}

strong {
  font-weight: bold;
}

.buttons {
  text-align: center;
}

.edit-btn,
.back-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #fff;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #17a2b8;
  margin-right: 10px;
}

.edit-btn:hover {
  background-color: #138496;
}

.back-btn {
  background-color: #6c757d;
}

.back-btn:hover {
  background-color: #5a6268;
}
</style>
