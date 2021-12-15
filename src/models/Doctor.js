const { nanoid } = require('nanoid');
const redis = require('redis');
const redisClient = redis.createClient();

class Doctor {
  constructor(name) {
    this.name = name || 'doctor';
  }
  get() {
    return new Promise((resolve, reject) => {
      redisClient.get(this.name+'s', (err, reply) => {
        if(err) return reject(err);

        return resolve(JSON.parse(reply));
      })
    })
  }

  add(data) {
    return new Promise(async (resolve, reject) => {
      if(typeof data === 'object' && !Array.isArray(data)) {
        // add id
        if(!data._id) {
          data._id = nanoid();
        }
        let doctors = await this.get();
        if(!doctors) {
          doctors = [];
        } else {
          doctors.push(data);
        }

        redisClient.set(this.name+'s', JSON.stringify(doctors));
        return resolve(data);
      } else {
        return reject("Need a object");
      }
    })
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      if(!id) return reject("Please enter id");
      redisClient.get(`${this.name}:${id}`, async (err, reply) => {
        if(err) return reject(err);
        else {
          if(!reply) {
            let doctors = await this.get();
            let data = doctors.find(doctor => doctor._id === id);
            
            if(!data) return reject("No have id like this");

            redisClient.set(`${this.name}:${id}`, JSON.stringify(data));
            return resolve(data);
          } else {
            return resolve(JSON.parse(reply));
          }
        }
      })
    })
  }

  update(id, data) {
    return new Promise(async (resolve, reject) => {
      if(!id) return reject("Please enter id");
      let doctors = await this.get();
      let oldData = doctors.find(doctor => doctor._id === id);
      
      if(!data) return reject("No have id like this");
      changeDataInObjects(data, oldData);

      redisClient.del(`${this.name}:${id}`);
      redisClient.set(`${this.name}s`, JSON.stringify(doctors));
      return resolve(data);
    })
  } 

  async isEmpty() {
    return (await this.get()).length === 0;
  }
}

// deep copy two object
const changeDataInObjects = (newData, oldData) => {
    for (let i in oldData) {
        for (let j in newData) {
            if (i === j) oldData[i] = newData[j];
            else oldData[j] = newData[j];
        }
    }
    return oldData;
};

module.exports = new Doctor();