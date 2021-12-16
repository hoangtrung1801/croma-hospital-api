const Doctor = require("../../models/Doctor");
const WaitingPatient = require("../../models/WaitingPatient");

module.exports.primitiveDiagnosis = async (req, res, next) => {
  /*
    Body request :
    + idDoctor 
    + disease ( id of disease)
    + severity
  */

  try {
    const { idDoctor, disease, severity } = req.body;
    const doctor = await Doctor.findById(idDoctor);

    // // pop top element of list of the patients of doctor 
    const patient = doctor.patients.splice(0, 1)[0];
    patient.disease = disease;
    patient.severity = severity;

    await Doctor.update(idDoctor, doctor);
    await WaitingPatient.add(patient);

    console.log(await WaitingPatient.get());
    res.status(200).json({
      status: "success",
    })
  } catch (err) {
    next(err);
  }
}