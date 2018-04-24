/*
    this is intended to be a more minimal version of automate for instances running on general pcs
    this makes the abilities more limited since we do not have ssh access

 */

const child_process = require('child_process');

const runCommand = (command, { user, password, ipAddress }) => new Promise((resolve, reject) => {
    const commandToExecute = `sshpass -p ${password} ssh -o StrictHostKeyChecking=no ${user}@${ipAddress} ${command}`;
    child_process.exec(commandToExecute, (error, stdout, stderr) => {
        if (error) {
            reject(stderr);
        } else {
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

const automateFirmware = {
    type: 'automate',
    isValidReachabilityInfo: identification => {
        const reachInfo = getReachData(identification);
        console.log(reachInfo);
        return reachInfo.user && reachInfo.password && reachInfo.ipAddress;
    },
    isValidConfig:  config => true,
    status: async reachabilityInfo => {
        const data = getReachData(reachabilityInfo);
        try {
            await runCommand(`'echo hello'`, {
                user:  data.user,
                password: data.password,
                ipAddress: data.ipAddress,
            });
            return 'ok';
        }catch(e){
            return 'error';
        }
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

module.exports = automateFirmware;
