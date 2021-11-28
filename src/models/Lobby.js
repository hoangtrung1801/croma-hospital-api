const mongoose = require('mongoose');
const {Schema} = mongoose;

const lobbySchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  }
})

let Lobby = mongoose.model('Lobby', lobbySchema);

class LobbyQueue {
  constructor(model) {
    this.model = model;
  }

  async get() {
    return new Promise(async (resolve, reject) => {
      try {
        let patientsData = await this.model.find().populate('patient');
        let patients = patientsData.map(patient => patient.patient);
        patients.sort((a, b) => {
          if(a.severity > b.severity) return 1;
          else return -1;
        })

        return resolve(patients);
      } catch (error) {
        return reject(error);
      }
    })
  }

  async push(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const patient = await this.model.create(data);
  
        return resolve(patient);
      } catch(err) {
        return reject(err);
      }
    });
  }

  async pop() {
    return new Promise(async (resolve, reject) => {
      try {
        let patientsData = await this.model.find().populate('patient');
        let patients = patientsData.map(patient => patient.patient);
        let patient = patients.sort((a, b) => {
          if(a.severity > b.severity) return 1;
          else return -1;
        })[0];
        patient = await Lobby.deleteOne({patient: patient._id});

        resolve(patient);
      } catch (error) {
        reject(error);      
      }
    })
  }

  async isEmpty() {
    const patients = await this.model.find();
    if(patients.length === 0) return true;
    return false;
  }
}

module.exports = new LobbyQueue(Lobby);