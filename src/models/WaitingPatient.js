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
}

module.exports = new WaitingPatient();