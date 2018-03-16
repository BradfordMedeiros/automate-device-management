
/*
  config looks like:
  {
    docker_image: <some_image_url>
  }

 */

const automate = {
  type: 'automate',
  isValidReachabilityInfo: identification => {
    return true;
  },
  isValidConfig:  config => {
    return true;
  },
  status: async () => {
    return 'ok';
  },
  config: async configText => {
    return true;
  },
  commands:  {
    unlock: async () => "ok",
    lock: async () => 'ok',
  },
};

module.exports = mockSlave.mock_slave;
