const Lobby = require("../../models/Lobby");
const Patient = require("../../models/Patient");

const examinateMedical = async (req, res, next) => {
  let imagePath = '';
  if(req.file) {
    const { path } = req.file;
    imagePath = '/' + path.split('\\').slice(2).join('/');
  }

  try {
    const patient = await Patient.create({
      ...req.body,
      image: imagePath
    });
    await Lobby.push({ patient : patient._id});

    const data = patient;
    res.status(200).json({
      status: 'success',
      data
    })
  } catch (error) {
    next(error);   
  }
}

module.exports = {
  examinateMedical
}