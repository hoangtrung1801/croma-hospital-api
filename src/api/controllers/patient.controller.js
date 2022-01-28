const Lobby = require("../../models/Lobby");
const Patient = require("../../models/Patient");
const Room = require("../../models/Room");
const WaitingPatient = require("../../models/WaitingPatient");

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

const getPatientsFromWaitingPatient = async(req, res, next) => {
  try {
    const patients = await WaitingPatient.get();

    res.status(200).json({
      status: 'success',
      data: patients
    })
  } catch(err) {
    next(err);
  }
}

const movePatientToRoom = async(req, res, next) => {
  /* 
    {
      1: {
        101: [<idPatient>, <idPatient>, <idPatient>],
        102: [<idPatient>, <idPatient>, <idPatient>]
      },
      2: {
        201: [<idPatient>, <idPatient>, <idPatient>],
        202: [<idPatient>, <idPatient>, <idPatient>]
      }
    }
  */

  try {
    const body = req.body;
    for(let numberFloor of Object.keys(body)) {
      let floor = body[numberFloor];
      for(let codeRoom of Object.keys(floor)) {
        let newPatients = floor[codeRoom];
        let patientsInRoom = (await Room.findOne(
          {
            floor: numberFloor,
            code: codeRoom
          }
        )).patients;
        patientsInRoom = patientsInRoom.concat(newPatients);

        await Room.findOneAndUpdate(
          {
            floor: numberFloor,
            code: codeRoom
          }, {
            patients: patientsInRoom
          }
        )

        for(let patientId of newPatients) {
          await WaitingPatient.remove(patientId);
        }
      }
    }

    res.status(200).json({
      status: 'success'
    })
  } catch(err) {
    next(err);
  }
}

const movePatientToRoomAutomatically = async(req, res, next) => {
  try {
    const waitingPatients = await WaitingPatient.get();
    const rooms = ( await Room.find() ).sort((a, b) => a.slot - a.patients.length > b.slot - b.patients.length);
    // console.log(rooms);
    waitingPatients.forEach(async ( waitingPatient ) => {
      const patient = await new Patient(waitingPatient);
      
    })
  } catch (err) {
    next(err);
  }
}

module.exports = {
  examinateMedical,
  getPatientsFromWaitingPatient,
  movePatientToRoomAutomatically,
  movePatientToRoom
}