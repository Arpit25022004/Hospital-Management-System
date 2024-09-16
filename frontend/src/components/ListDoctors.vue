<template>
  <div class="doctors-container">
    <h1 class="title">Doctors</h1>
    <div class="doctor-act">
    <button class="btn create-doctor" @click="createDoctor">Create Doctor</button>
    <button class="btn create-doctor" @click="triggerFileInput">Bulk Upload</button>
    </div>
    <input
      type="file"
      ref="fileInput"
      style="display: none;"
      @change="handleFileChange"
      accept=".xlsx"
    />
    
    <div class="doctors-list-container">
      <ul class="doctors-list">
        <li v-for="doctor in doctors" :key="doctor.id" class="doctor-item">
          <div class="doctor-info">
            <span class="doctor-name">{{ doctor.name }}</span>
            <span class="doctor-status" :class="{ 'free': doctor.status_free }">
              {{ doctor.status_free ? 'Free' : 'Occupied' }}
            </span>
          </div>
          <div class="doctor-actions">
            <button class="btn view-btn" @click="viewDoctor(doctor.id)">View</button>
            <button class="btn edit-btn" @click="editDoctor(doctor.id)">Edit</button>
            <button class="btn delete-btn" @click="deleteDoctor(doctor.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
    
    <button class="btn back-btn" @click="$router.push('/home')">Back</button>
  </div>
</template>

<script>
import { getAllDoctors, deleteDoctor } from '../services/doctorService';
import { bulkUpload } from '../services/bulkservice';

export default {
  name: 'ListDoctors',
  data() {
    return {
      doctors: []
    };
  },
  async mounted() {
    try {
      const response = await getAllDoctors();
      this.doctors = response.data;
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click(); // Trigger the hidden file input
    },
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          // Implement the file upload logic here
          // For example, you might call your bulkUpload service with the file
          await bulkUpload(file);
          alert('File uploaded successfully');
        } catch (error) {
          console.error('Failed to upload file:', error);
        }
      }
    },
    createDoctor() {
      this.$router.push('/doctors');
    },
    viewDoctor(id) {
      this.$router.push(`/doctors/${id}`);
    },
    editDoctor(id) {
      this.$router.push(`/edit-doctor/${id}`);
    },
    async deleteDoctor(id) {
      try {
        await deleteDoctor(id);
        this.doctors = this.doctors.filter(doctor => doctor.id !== id);
      } catch (error) {
        console.error('Failed to delete doctor:', error);
      }
    }
  }
};
</script>

<style scoped>
.doctors-container {
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

.create-doctor {
  background-color: #28a745;
}

.create-doctor:hover {
  background-color: #218838;
}

.doctors-list-container {
  height: 500px; /* Adjust as needed for your design */
  overflow-y: auto;
  margin-bottom: 60px; /* Space for fixed button */
}

.doctors-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.doctor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.doctor-info {
  display: flex;
  flex-direction: column;
}

.doctor-name {
  font-weight: bold;
  text-align: left;
}

.doctor-status {
  color: #6c757d;
  text-align: left;
}

.doctor-status.free {
  color: #28a745;
}

.doctor-actions {
  display: flex;
  gap: 10px;
}
.doctor-act{
  display:flex;
  gap:10px;
  align-items: center;
  justify-content: center; 
  
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
