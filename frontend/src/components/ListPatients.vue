<template>
  <div class="patients-container">
    <h1 class="title">Patients</h1>

    <button class="btn create-patient" @click="createPatient">Create Patient</button>
    
    <div class="patients-list-container">
      <ul class="patients-list">
        <li v-for="patient in patients" :key="patient.id" class="patient-item">
          <div class="patient-info">
            <span class="patient-name">{{ patient.name }}</span>
          </div>
          <div class="patient-actions">
            <button class="btn view-btn" @click="viewPatient(patient.id)">View</button>
            <button class="btn edit-btn" @click="editPatient(patient.id)">Edit</button>
            <button class="btn delete-btn" @click="deletePatient(patient.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
    
    <button class="btn back-btn" @click="$router.go(-1)">Back</button>
  </div>
</template>

<script>
import { getAllPatients, deletePatient } from '../services/patientService';

export default {
  name: 'ListPatients',
  data() {
    return {
      patients: []
    };
  },
  async mounted() {
    try {
      const response = await getAllPatients();
      this.patients = response.data;
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  },
  methods: {
    createPatient() {
      this.$router.push('/patients');
    },
    viewPatient(id) {
      this.$router.push(`/patients/${id}`);
    },
    editPatient(id) {
      this.$router.push(`/edit-patient/${id}`);
    },
    async deletePatient(id) {
      try {
        await deletePatient(id);
        this.patients = this.patients.filter(patient => patient.id !== id);
      } catch (error) {
        console.error('Failed to delete patient:', error);
      }
    }
  }
};
</script>

<style scoped>
.patients-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  position: relative; /* For positioning the fixed button */
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #fff;
  transition: background-color 0.3s;
}

.create-patient {
  background-color: #17a2b8;
}

.create-patient:hover {
  background-color: #138496;
}

.patients-list-container {
  height: 500px; /* Adjust as needed for your design */
  overflow-y: auto;
  margin-bottom: 60px; /* Space for fixed button */
}

.patients-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.patient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.patient-info {
  display: flex;
  flex-direction: column;
}

.patient-name {
  font-weight: bold;
}

.patient-actions {
  display: flex;
  gap: 10px;
}

.view-btn {
  background-color: #007bff;
}

.view-btn:hover {
  background-color: #0056b3;
}

.edit-btn {
  background-color: #ffc107;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #c82333;
}

.back-btn {
  position: fixed;
  bottom: 20px;
  background-color: #6c757d;
}

.back-btn:hover {
  background-color: #5a6268;
}
</style>
