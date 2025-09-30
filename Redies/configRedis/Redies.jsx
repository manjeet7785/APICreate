const redis = require("redis");




const RedisClient = redis.createClient({
  username: 'default',
  password: 'lBQDwPMsptyslh02UEydNMBA9gmvc0OE',
  socket: {
    host: 'redis-13564.c17.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 13564
  }
})


// jb isko main file me likhte hai to isko yeha se hta dete hai


// const ConnectRedies = async () => {
//   await RedisClient.connect();
//   console.log("Redis Connected DB");

// }
// ConnectRedies();


module.exports = RedisClient;



