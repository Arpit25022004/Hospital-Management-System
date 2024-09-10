<template>
  <div class="edit-doctor-container">
    <h1 class="title">Edit Doctor</h1>
    <form @submit.prevent="updateDoctor" class="edit-form">
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
      <div class="buttons">
        <button type="submit" class="submit-btn">Update Doctor</button>
        <button @click="$router.go(-1)" class="back-btn">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
//import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDoctorById,updateDoctor as updatedoctor } from '../services/doctorService';

export default {
  name: 'EditDoctor',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const doctor = ref({
      name: '',
      phone_no: '',
      specializations: '',
      status_free: true,
    });

    const id = route.params.id;

    // Fetch doctor details
    const fetchDoctor = async () => {
      try {
        const response = await getDoctorById(id);
        doctor.value = {
          name: response.data.name,
          phone_no: response.data.phone_no,
          specializations: response.data.specializations,
          status_free: response.data.status_free,
        };
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    // Update doctor details
    const updateDoctor = async () => {
      try {
        await updatedoctor(id,{
          name: doctor.value.name,
          phone_no: String(doctor.value.phone_no),
          specializations: doctor.value.specializations,
          status_free: doctor.value.status_free,
        });
        router.push('/doctorslist');
      } catch (error) {
        console.error('Error updating doctor:', error);
      }
    };

    // Load doctor data on component mount
    onMounted(fetchDoctor);

    return {
      doctor,
      updateDoctor,
    };
  },
};
</script>

<style scoped>
.edit-doctor-container {
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
.form-group input[type="checkbox"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="checkbox"] {
  width: auto;
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
