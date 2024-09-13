const { doctor } = require('../models');
const doctor_presenter = require('../presenters/doctorPresenter');
const  validateDoctor  = require('../validators/doctorValidator');

class DoctorController{
static async createDoctor(req, res){
  try {
    console.log(req.body);
    const { error } = validateDoctor.validate(req.body);
    console.log(error);
    if (error) return res.status(400).send(error.details[0].message);

    const newDoctor = await doctor.createDoctor(req.body);
    res.status(201).send(doctor_presenter.formatDoctor(newDoctor));
  } catch (err) {
    console.log(error);
    res.status(500).send(err.message);
  }
};

static async getAllDoctors (req, res) {
  try {
    const allDoctors = await doctor.getAllDoctor();
    res.status(200).send(doctor_presenter.formatDoctorsList(allDoctors));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

static async getDoctorById (req, res) {
  try {
    const doc = await doctor.getDoctorById(req.params.id);
    if (!doc) return res.status(404).send('Doctor not found');
    res.status(200).send(doctor_presenter.formatDoctor(doc));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

static async updateDoctor(req, res) {
  try {
    const { error } = validateDoctor.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const doc = await doctor.getDoctorById(req.params.id);
    if (!doc) return res.status(404).send('Doctor not found');

    await doc.update(req.body);
    res.status(200).send(doctor_presenter.formatDoctor(doc));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

static async deleteDoctor (req, res) {
  try {
    const doc = await doctor.getDoctorById(req.params.id);
    if (!doc) return res.status(404).send('Doctor not found');

    await doc.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
};
module.exports = DoctorController;
