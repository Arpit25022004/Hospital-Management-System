const { Patient } = require('../models');
const patient_presenter = require('../presenters/patientPresenter');
const  validatePatient  = require('../validators/patientValidator');

class PatientController{
  
static async createPatient (req, res) {
  try {
    const { error } = validatePatient.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newPatient = await Patient.createPatient(req.body);
    res.status(201).send(patient_presenter.formatPatient(newPatient));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

static async getAllPatients(req, res) {
  try {
    const allPatients = await Patient.getAllPatients();
    res.status(200).send(patient_presenter.formatPatientsList(allPatients));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

static async getPatientById (req, res) {
  try {
    const patient = await Patient.getPatientById(req.params.id);
    if (!patient) return res.status(404).send('Patient not found');
    res.status(200).send(patient_presenter.formatPatient(patient));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

static async updatePatient (req, res) {
  try {
    const { error } = validatePatient.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const patient = await Patient.getPatientById(req.params.id);
    if (!patient) return res.status(404).send('Patient not found');

    await patient.update(req.body);
    res.status(200).send(patient_presenter.formatPatient(patient));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

static async deletePatient (req, res) {
  try {
    const patient = await Patient.getPatientById(req.params.id);
    if (!patient) return res.status(404).send('Patient not found');

    await patient.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
};

module.exports=PatientController;