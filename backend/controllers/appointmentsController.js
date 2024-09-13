const { appointments } = require('../models');
const appointmentsPresenter = require('../presenters/appointmentsPresenter');
const validateAppointment = require('../validators/appointmentsValidator');

class AappointmentsController{
static async createAppointment(req, res) {
  try {
    const { error } = validateAppointment.validate(req.body);
    if (error) return res.status(400).send(error);

    const newAppointment = await appointments.scheduleAppointment(req.body);

    // Include doctor and patient information if needed
    const doctor = await newAppointment.getDoctor();
    const patient = await newAppointment.getPatient();
    
    const formattedAppointment = await appointmentsPresenter.formatAppointment(newAppointment, doctor, patient);
    res.status(201).send(formattedAppointment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

static async getAllAppointments (req, res) {
  try {
    const allAppointments = await appointments.findAll({
      include: ['doctor', 'patient']
    });

    const formattedAppointments = await Promise.all(
      allAppointments.map(async (appointment) => {
        const doctor = await appointment.getDoctor();
        const patient = await appointment.getPatient();
        return appointmentsPresenter.formatAppointment(appointment, doctor, patient);
      })
    );
    
    res.status(200).send(formattedAppointments);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

static async getAppointmentById(req, res) {
  try {
    const appointment = await appointments.findByPk(req.params.id, {
      include: ['doctor', 'patient']
    });
    if (!appointment) return res.status(404).send('Appointment not found');

    const doctor = await appointment.getDoctor();
    const patient = await appointment.getPatient();
    const formattedAppointment = await appointmentsPresenter.formatAppointment(appointment, doctor, patient);

    res.status(200).send(formattedAppointment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

static async updateAppointment (req, res)  {
  try {
    const { error } = validateAppointment.validate(req.body);
    if (error) return res.status(400).send(error);

    const appointment = await appointments.findByPk(req.params.id);
    if (!appointment) return res.status(404).send('Appointment not found');

    await appointment.update(req.body);

    const doctor = await appointment.getDoctor();
    const patient = await appointment.getPatient();
    const formattedAppointment = await appointmentsPresenter.formatAppointment(appointment, doctor, patient);

    res.status(200).send(formattedAppointment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

static async deleteAppointment (req, res)  {
  try {
    const appointment = await appointments.findByPk(req.params.id);
    if (!appointment) return res.status(404).send('Appointment not found');

    await appointments.deleteAppointment(appointment.id, appointment.doc_id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
};
module.exports=AappointmentsController;