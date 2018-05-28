import { DefaultConfig } from "./config.default";

export default () => {
  const config: DefaultConfig = {};
  config.cluster = {
    listen: {
      port: 7001,
      hostname: "0.0.0.0",
      proxy: true

      // path: '/var/run/egg.sock',
    }
  };



  return config;
};
