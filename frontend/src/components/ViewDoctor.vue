<template>
  <div class="doctor-details-container">
    <h1 class="title">Doctor Details</h1>
    <div class="doctor-details">
      <p><strong>ID:</strong> {{ doctor.id }}</p>
      <p><strong>Name:</strong> {{ doctor.name }}</p>
      <p><strong>Phone No:</strong> {{ doctor.phone_no }}</p>
      <p><strong>Specializations:</strong> {{ doctor.specializations }}</p>
      <p><strong>Status Free:</strong> {{ doctor.status_free ? 'Yes' : 'No' }}</p>
    </div>
    <div class="buttons">
      <button @click="editDoctor" class="edit-btn">Edit</button>
      <button @click="$router.go(-1)" class="back-btn">Back</button>
    </div>
  </div>
</template>

<script>
import { getDoctorById } from '../services/doctorService';

export default {
  name: 'ViewDoctor',
  data() {
    return {
      doctor: {}
    };
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      const response = await getDoctorById(id);
      this.doctor = response.data;
    } catch (error) {
      console.error('Failed to fetch doctor:', error);
    }
  },
  methods: {
    editDoctor() {
      this.$router.push(`/edit-doctor/${this.doctor.id}`);
    }
  }
};
</script>

<style scoped>
.doctor-details-container {
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

.doctor-details {
  margin-bottom: 20px;
}

.doctor-details p {
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
