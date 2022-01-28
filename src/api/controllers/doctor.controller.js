const Doctor = require("../../models/Doctor");
const Patient = require("../../models/Patient");
const WaitingPatient = require("../../models/WaitingPatient");

const primitiveDiagnosis = async (req, res, next) => {
  /*
    Body request :
    + idDoctor 
    + disease ( id of disease)
    + severity
  */

  try {
    const { idDoctor, disease, severity } = req.body;
    const doctor = await Doctor.findById(idDoctor);

    // pop top element of list of the patients of doctor 
    const rawPatient = doctor.patients.splice(0, 1)[0];
    rawPatient.disease = disease;
    rawPatient.severity = severity;

    const patient = await Patient.create(rawPatient);

    await Doctor.update(idDoctor, doctor);
    await WaitingPatient.add(patient);

    res.status(200).json({
      status: "success",
    })
  } catch (err) {
    next(err);
  }
}

module.exports = {
  primitiveDiagnosis
}