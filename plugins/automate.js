
/*
  reachability info look like:
  user=root;password=password;host=host;ip=someIp;

  sshpass -p "root" ssh root@localhost -p 9000 "echo hello"

  config looks like:
  dockerImageName

 */


const child_process = require('child_process');

const generateCommand = image => `docker rmi -f ${image} && docker pull ${image}`;
const runCommand = ({ user, password, ipAddress, image }) => new Promise((resolve, reject) => {
  const command = `sshpass -p ${password} ssh ${user}@${ipAddress} ${generateCommand(image)}`;
  child_process.exec(command,  (error, stdout, stderr) => {
    if (error){
      reject(stderr);
    }else{
      resolve(stdout);
    }
  });
});

const getReachData = reachabilityInfo => {
  const data = reachabilityInfo.split(';');
  const mapping = { };
  data.forEach(item => {
    const values = item.split('=');
    mapping[values[0]] = values[1];
  });
  return mapping;
};

const automate = {
  type: 'automate',
  isValidReachabilityInfo: identification => {
    const reachInfo = getReachData(identification);
    console.log(reachInfo);
    return reachInfo.user && reachInfo.password && reachInfo.ipAddress;
  },
  isValidConfig:  config => true,
  status: async reachabilityInfo => {
    const data = getReachData(reachabilityInfo);
    return await runCommand('echo hello', {
      user:  data.user,
      password: data.password,
      ipAddress: data.ipAddress,
    });
  },
  config: async (configText, reachabilityInfo) => {
    const image = configText;
    const data = getReachData(reachabilityInfo);
    console.log('configuring with: ', image);
    const isRun = await runCommand({
      user: data.user,
      password: data.password,
      ipAddress: data.ipAddress,
      image,
    });
    console.log('finished running');
    return isRun;
  },
  commands:  {
    unlock: async () => "ok",
    lock: async () => 'ok',
  },
};

module.exports = automate;
