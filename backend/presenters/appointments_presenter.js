const doctorPresenter = require('./doctor_presenter');
const patientPresenter = require('./patient_presenter');

class AppointmentPresenter {
  static async formatAppointment(appointment, doctor = null, patient = null) {
    const formattedAppointment = {
      id: appointment.id,
      slot: appointment.slot,
      doc_id: appointment.doc_id,
      pat_id: appointment.pat_id,
      createdAt: appointment.createdAt.toISOString(), // Convert to ISO string
      updatedAt: appointment.updatedAt.toISOString()  // Convert to ISO string
    };

    if (doctor) {
      formattedAppointment.doctor = doctorPresenter.formatDoctor(doctor);
    }

    if (patient) {
      formattedAppointment.patient = patientPresenter.formatPatient(patient);
    }

    return formattedAppointment;
  }
}

module.exports = AppointmentPresenter;
