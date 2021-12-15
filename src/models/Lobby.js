const { nanoid } = require('nanoid');
const redis = require('redis');
const redisClient = redis.createClient();

class Lobby {
  constructor(name) {
    this.name = name || 'lobby';
  }
  get() {
    return new Promise((resolve, reject) => {
      redisClient.zrange(this.name, 0, -1, (err, reply) => {
        if(err) return reject(err);
        let data = reply.join(',');
        data = JSON.parse('[' + data + ']');
        return resolve(data);
      })
    })
  }

  add(data) {
    return new Promise((resolve, reject) => {
      if(typeof data === 'object' && !Array.isArray(data)) {
        const {severity} = data;
        // check severity is empty
        if(!severity) return reject("Patient need enter a severity");

        // add id
        if(!data._id) {
          data._id = nanoid();
        }

        redisClient.zadd(this.name, severity, JSON.stringify(data));
        return resolve(data);
      } else {
        return reject("Need a object");
      }
    })
  }

  pop() {
    return new Promise((resolve, reject) => {
      redisClient.zpopmin(this.name, 1, (err, reply) => {
        if(err) return reject(err);
        if(reply == '') return reject("Have no data more");

        const data = reply[0];
        return resolve(JSON.parse(data));
      });
    })
  }

  async isEmpty() {
    return (await this.get()).length === 0;
  }
}

module.exports = new Lobby();