import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  sequelize: {
    enable: false,
    package: "egg-sequelize"
  },
  // config/plugin.js
  oss: {
    enable: true,
    package: "egg-oss"
  },
  static: {
    enable: true,
    package: "egg-static"
  },
  // mongoose: {
  // enable: true,
  // package: "egg-mongoose"
  // },
  nunjucks: {
    enable: true,
    package: "egg-view-nunjucks"
  },
  mysql: {
    enable: true,
    package: "egg-mysql"
  },

  // cors: {
  // enable: true,
  // package: "egg-cors"
  // }
};

export default plugin;
