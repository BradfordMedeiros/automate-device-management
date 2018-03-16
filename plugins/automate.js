
/*
  reachability info look like:
  {
    ipAddress: x,
    user: y,
    password: password,
  }
  sshpass -p "root" ssh root@localhost -p 9000 "echo hello"

  config looks like:
  {
    dockerImage: <some_image_url>
  }

 */

const child_process = require('child_process');

const runCommand = (command, { user, password, ipAddress }) => new Promise((resolve, reject) => {
  child_process.exec(`sshpass -p "root" ssh ${user}@${ipAddress} -p 9000 "${command}"`,  (error, stdout, stderr) => {
    if (error){
      reject(stderr);
    }else{
      resolve(stdout);
    }
  });
});

const automate = {
  type: 'automate',
  isValidReachabilityInfo: identification => {
    try {
      const data = JSON.parse(identification);
      return (
        typeof(data.ipAddress) === 'string' &&
        typeof(data.user) === 'string' &&
        typeof(data.password) === 'string'
      )
    }catch(e){
      return false;
    }
  },
  isValidConfig:  config => {
    try {
      const data = JSON.parse(config);
      return (
        typeof(data.dockerImage) === 'string'
      )
    }catch(e){
      return false;
    }
  },
  status: async reachabilityInfo => {
    return await runCommand('touch /someshit', {
      user:  reachabilityInfo.user,
      password: reachabilityInfo.password,
      ipAddress: reachabilityInfo.ipAddress,
    });
  },
  config: async (configText, reachabilityInfo) => {
    return 'ok';
  },
  commands:  {
    unlock: async () => "ok",
    lock: async () => 'ok',
  },
};

module.exports = automate;
