<template>
  <div class="create-appointment-container">
    <h1 class="title">Create New Appointment</h1>
    <form @submit.prevent="createAppointment" class="appointment-form">
      <div class="form-group">
        <label for="slot">Slot:</label>
        <input v-model="appointment.slot" id="slot" type="text" required />
      </div>
      
      <div class="form-group">
        <label for="doc_id">Doctor ID:</label>
        <select v-model="appointment.doc_id" id="doc_id" required>
          <option value="" disabled>Select a doctor</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }} (ID: {{ doctor.id }})
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="pat_id">Patient ID:</label>
        <select v-model="appointment.pat_id" id="pat_id" required>
          <option value="" disabled>Select a patient</option>
          <option v-for="patient in patients" :key="patient.id" :value="patient.id">
            {{ patient.name }} (ID: {{ patient.id }})
          </option>
        </select>
      </div>
      
      <button type="submit" class="submit-btn">Create Appointment</button>
    </form>
    <button @click='$router.go(-1)' class="back-btn">Back</button>
  </div>
</template>

<script>
//import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {getAllDoctors} from '../services/doctorService';
import {getAllPatients} from '../services/patientService';
import {createAppointment as CreateAppointments} from '../services/appointmentService'

export default {
  name: 'CreateAppointment',
  setup() {
    const router = useRouter();
    const appointment = ref({
      slot: '',
      doc_id: '',
      pat_id: ''
    });
    
    const doctors = ref([]);
    const patients = ref([]);

    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors();
        doctors.value = response.data;
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await getAllPatients();
        patients.value = response.data;
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    const createAppointment = async () => {
      try {
        await CreateAppointments({
          slot: appointment.value.slot,
          doc_id: appointment.value.doc_id,
          pat_id: appointment.value.pat_id
        });
        router.push('/appointmentslist');
      } catch (error) {
        console.error('Error creating appointment:', error);
      }
    };

    onMounted(() => {
      fetchDoctors();
      fetchPatients();
    });

    return {
      appointment,
      createAppointment,
      doctors,
      patients
    };
  }
};
</script>

<style scoped>
.create-appointment-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.appointment-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.submit-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #fff;
  background-color: #17a2b8;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #138496;
}

.back-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #6c757d;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #5a6268;
}
</style>
