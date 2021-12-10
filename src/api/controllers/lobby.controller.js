const Lobby = require('../../models/Lobby');

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