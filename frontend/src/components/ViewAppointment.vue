<template>
  <div class="appointment-details-container">
    <h1 class="title">Appointment Details</h1>
    <div class="appointment-info" v-if="appointment.doctor && appointment.patient">
      <p><strong>ID:</strong> {{ appointment.id }}</p>
      <p><strong>Slot:</strong> {{ appointment.slot }}</p>
      <p><strong>Doctor ID:</strong> {{ appointment.doc_id }}</p>
      <p><strong>Doctor Name:</strong> {{ appointment.doctor.name }}</p>
      <p><strong>Patient ID:</strong> {{ appointment.pat_id }}</p>
      <p><strong>Patient Name:</strong> {{ appointment.patient.name }}</p>
    </div>
    <div v-else>
      <p>Loading appointment details...</p>
    </div>
    <div class="buttons">
      <button class="btn edit-btn" @click="editAppointment">Edit</button>
      <button class="btn back-btn" @click="$router.go(-1)">Back</button>
    </div>
  </div>
</template>

<script>
import { getAppointmentById } from '../services/appointmentService';

export default {
  name: 'ViewAppointment',
  data() {
    return {
      appointment: {}
    };
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      const response = await getAppointmentById(id);
      this.appointment = response.data;
    } catch (error) {
      console.error('Failed to fetch appointment details:', error);
    }
  },
  methods: {
    editAppointment() {
      this.$router.push(`/edit-appointment/${this.appointment.id}`);
    }
  }
};
</script>

<style scoped>
.appointment-details-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.appointment-info {
  margin-bottom: 20px;
}

.appointment-info p {
  font-size: 1.2rem;
  margin: 5px 0;
}

.appointment-info strong {
  font-weight: bold;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
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

.edit-btn {
  background-color: #ffc107;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.back-btn {
  background-color: #6c757d;
}

.back-btn:hover {
  background-color: #5a6268;
}
</style>
