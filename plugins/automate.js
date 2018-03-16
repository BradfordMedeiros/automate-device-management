
/*
  reachability info look like:
  {
    ip_address: x,
    user: y,
    password: password,
  }
  sshpass -p "root" ssh root@localhost -p 9000 "echo hello"

  config looks like:
  {
    docker_image: <some_image_url>
  }

 */

const automate = {
  type: 'automate',
  isValidReachabilityInfo: identification => {
    try {
      const data = JSON.parse(identification);
      return (
        typeof(data.ip_address) === 'string' &&
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
        typeof(data.docker_image) === 'string'
      )
    }catch(e){
      return false;
    }
  },
  status: async () => {
    return 'ok';
  },
  config: async configText => {

  },
  commands:  {
    unlock: async () => "ok",
    lock: async () => 'ok',
  },
};

module.exports = automate;
