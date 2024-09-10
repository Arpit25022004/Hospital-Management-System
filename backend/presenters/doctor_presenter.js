class DoctorPresenter {
  static formatDoctor(doctor) {
    return {
      id: doctor.id,
      name: doctor.name,
      phone_no: doctor.phone_no, // assuming phone_no is a string
      specializations: doctor.specializations,
      status_free: doctor.status_free,
      createdAt: doctor.createdAt.toISOString(), // Convert to ISO string
      updatedAt: doctor.updatedAt.toISOString()  // Convert to ISO string
    };
  }

  static formatDoctorsList(doctors) {
    return doctors.map(DoctorPresenter.formatDoctor);
  }
}

module.exports = DoctorPresenter;
