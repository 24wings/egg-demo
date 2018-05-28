import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};
  config.proxy = true;
  return config;
};
