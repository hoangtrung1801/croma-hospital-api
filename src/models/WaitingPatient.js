const redis = require('redis');
const redisClient = redis.createClient();

/* 
  WaitingPatient : ( list of patient of the doctor)
  + idDoctor
*/
class WaitingPatient {
  constructor(name) {
    this.name = name || 'waitingPatient';
  }

  get() {
    return new Promise((resolve, reject) => {
      redisClient.lrange(this.name, 0, -1, (err, reply) => {
        const list = reply.map(e => JSON.parse(e));
        if(err) return reject(err);
        if(!list.length) return resolve([]);

        return resolve(list);
      })
    })
  }

  add(data) {
    return new Promise((resolve, reject) => {
      if(typeof data === 'object' && !Array.isArray(data)) {
        redisClient.rpush(this.name, JSON.stringify(data), (err, reply) => {
            if(err) return reject(err);
            return resolve(data);
        })
      } else {
        return reject("Need a object");
      }
    })
  }

  pop() {
    return new Promise(async (resolve, reject) => {
      redisClient.lpop(this.name, (err, reply) => {
        if(err) return reject(err);
        return resolve(JSON.parse(reply));
      })
    });
  }

  findById(id){
    return new Promise(async (resolve, reject) => {
      redisClient.lrange(this.name, 0, -1, (err, reply) => {
        // const list = reply.map(e => JSON.parse(e));
        const patient = JSON.parse(
          reply.filter(e => JSON.parse(e)._id == id)[0]
        );
        if (err) return reject(err);
        return resolve(patient);
      })
    })
  }

  remove(id) {
    return new Promise(async (resolve, reject) => {

      redisClient.lrange(this.name, 0, -1, (err, reply) => {
        let patient = JSON.parse(
          reply.filter(e => JSON.parse(e)._id == id)[0]
        );

        redisClient.lrem(this.name, 1, JSON.stringify(patient), (err, reply) => {
          if(err) return reject(err);
          return resolve();
        });
      })
    })
  }
}

module.exports = new WaitingPatient();