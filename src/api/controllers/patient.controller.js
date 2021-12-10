const Lobby = require("../../models/Lobby");
const Patient = require("../../models/Patient");

const examinateMedical = async (req, res, next) => {
  let imagePath = '';
  if(req.file) {
    const { path } = req.file;
    imagePath = '/' + path.split('\\').slice(2).join('/');
  }

  try {
    const patient = await Lobby.add({
      ...req.body,
      image: imagePath
    });

    res.status(200).json({
      status: 'success',
      data: patient
    })
  } catch (error) {
    next(error);   
  }
}

module.exports = {
  examinateMedical
}