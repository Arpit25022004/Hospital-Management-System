// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeComp from '../components/HomeComp.vue';
import CreateDoctor from '../components/CreateDoctor.vue';
import ListDoctors from '../components/ListDoctors.vue';
import ViewDoctor from '../components/ViewDoctor.vue';
import EditDoctor from '../components/EditDoctor.vue';
import ListPatients from '../components/ListPatients.vue';
import EditPatient from '../components/EditPatient.vue';
import ViewPatient from '../components/ViewPatient.vue';
import CreatePatient from '../components/CreatePatient.vue';
import ListAppointment from '../components/ListAppointment.vue';
import ViewAppointment from '../components/ViewAppointment.vue';
import EditAppointment from '../components/EditAppointment.vue';
import CreateAppointment from '../components/CreateAppointment.vue';
import LoginPage from '../components/LoginPage.vue'; // Add your Login component
import SignupPage from '../components/SignupPage.vue'; // Add your Signup component
import WelcomePage from '../components/WelcomePage.vue';

const routes = [
  { path: '/', component:WelcomePage},
  { path: '/home', component: HomeComp,meta: { requiresAuth: true } },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/appointments', component: CreateAppointment,meta: { requiresAuth: true } },
  { path: '/doctors', component: CreateDoctor ,meta: { requiresAuth: true }},
  { path: '/doctorslist', component: ListDoctors ,meta: { requiresAuth: true }},
  { path: '/doctors/:id', component: ViewDoctor ,meta: { requiresAuth: true }},
  { path: '/edit-doctor/:id?', component: EditDoctor ,meta: { requiresAuth: true }},
  { path: '/patientslist', component: ListPatients,meta: { requiresAuth: true }},
  { path: '/patients/:id', component: ViewPatient ,meta: { requiresAuth: true }},
  { path: '/edit-patient/:id?', component: EditPatient ,meta: { requiresAuth: true }},
  { path: '/patients', component: CreatePatient ,meta: { requiresAuth: true }},
  { path: '/appointmentslist', component: ListAppointment ,meta: { requiresAuth: true }},
  { path: '/appointment/:id', component: ViewAppointment ,meta: { requiresAuth: true }},
  { path: '/edit-appointment/:id?', component: EditAppointment ,meta: { requiresAuth: true }}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
