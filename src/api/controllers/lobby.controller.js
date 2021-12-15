const Lobby = require('../../models/Lobby');
const Doctor = require('../../models/Doctor');
const findDoctorHaveAtLeastPatient = require('../../helpers/findDoctorHaveAtLeastPatient');

const getPatients = async (req, res, next) => {
  try {
    const patients = await Lobby.get();

    res.status(200).json({
      status: 'success',
      data: [...patients]
    })
  } catch (error) {
    next(error);
  }
}

const coordinate = async(req, res, next) => {
  try {
    if(await Lobby.isEmpty()) {
      const err = new Error("Have no patients");
      err.statusCode = 400;
      return next(err);
    }
    const patient = await Lobby.pop();
    const doctors = await Doctor.get();
    const suitableDoctor = findDoctorHaveAtLeastPatient(doctors);
    suitableDoctor.patients.push(patient);
    await Doctor.update(suitableDoctor._id, suitableDoctor);

    res.status(200).json({
      status: 'success',
      message: `Patient is moved to reception`
    })
  } catch (error) {
    next(error);
  } 
}

module.exports = {
  getPatients,
  coordinate
}