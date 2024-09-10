<template>
  <div class="appointments-container">
    <h1 class="title">Appointments</h1>

    <button class="btn create-appointment" @click="createAppointment">Create Appointment</button>
    
    <div class="appointments-list-container">
      <ul class="appointments-list">
        <li v-for="appointment in appointments" :key="appointment.id" class="appointment-item">
          <div class="appointment-info">
            <span class="appointment-slot">Slot: {{ appointment.slot }}</span>
            <span class="appointment-doc">Doc ID: {{ appointment.doc_id }}</span>
            <span class="appointment-pat">Pat ID: {{ appointment.pat_id }}</span>
          </div>
          <div class="appointment-actions">
            <button class="btn view-btn" @click="viewAppointment(appointment.id)">View</button>
            <button class="btn edit-btn" @click="editAppointment(appointment.id)">Edit</button>
            <button class="btn delete-btn" @click="deleteAppointment(appointment.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
    
    <button class="btn back-btn" @click="$router.go(-1)">Back</button>
  </div>
</template>

<script>
import { getAllAppointments, deleteAppointment } from '../services/appointmentService';

export default {
  name: 'ListAppointments',
  data() {
    return {
      appointments: []
    };
  },
  async mounted() {
    try {
      const response = await getAllAppointments();
      this.appointments = response.data;
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  },
  methods: {
    createAppointment() {
      this.$router.push('/appointments');
    },
    viewAppointment(id) {
      this.$router.push(`/appointment/${id}`);
    },
    editAppointment(id) {
      this.$router.push(`/edit-appointment/${id}`);
    },
    async deleteAppointment(id) {
      try {
        await deleteAppointment(id);
        this.appointments = this.appointments.filter(appointment => appointment.id !== id);
      } catch (error) {
        console.error('Failed to delete appointment:', error);
      }
    }
  }
};
</script>

<style scoped>
.appointments-container {
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

.create-appointment {
  background-color: #17a2b8;
}

.create-appointment:hover {
  background-color: #138496;
}

.appointments-list-container {
  height: 500px; /* Adjust height as needed */
  overflow-y: auto;
  margin-bottom: 60px; /* Space for fixed button */
}

.appointments-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.appointment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.appointment-info {
  display: flex;
  flex-direction: column;
}

.appointment-slot,
.appointment-doc,
.appointment-pat {
  font-weight: bold;
  margin-bottom: 5px;
}

.appointment-actions {
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
