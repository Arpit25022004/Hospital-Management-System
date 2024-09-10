class PatientPresenter {
  static formatPatient(patient) {
    return {
      id: patient.id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      createdAt: patient.createdAt.toISOString(), // Convert to ISO string
      updatedAt: patient.updatedAt.toISOString()  // Convert to ISO string
    };
  }

  static formatPatientsList(patients) {
    return patients.map(this.formatPatient);
  }
}

module.exports = PatientPresenter;
