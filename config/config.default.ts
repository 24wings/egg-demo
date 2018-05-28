import { EggAppConfig, PowerPartial } from "egg";
import path = require("path");
// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
}

export default (appInfo: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${
    appInfo.name
    }`;


  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1524146141340_7369";

  // add your config here
  config.middleware = [];
  // config.sequelize = {
  //   dialect: "mysql", // support: mysql, mariadb, postgres, mssql
  //   database: "customer",
  //   host: "47.100.23.203",
  //   port: "3306",
  //   username: "misheng",
  //   password: "misheng"
  // };
  // config/config.${env}.js
  config.mysql = {
    clients: {
      // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
      customer: {
        // host
        host: "47.100.23.203",
        // 端口号
        port: "3306",
        // 用户名
        user: "misheng",
        // 密码
        password: "misheng",
        // 数据库名
        database: "customer"
      },
      m2centraldb: {
        // host
        host: "47.100.23.203",
        // 端口号
        port: "3306",
        // 用户名
        user: "misheng",
        // 密码
        password: "misheng",
        // 数据库名
        database: "m2centraldb"
      }
    }
  };

  // config.mongoose = {
  // client: {
  // url: "mongodb://118.31.72.227/tutu",
  // options: {}
  // }
  // };
  config.cluster = {
    listen: {
      port: 80,
      hostname: "0.0.0.0",
      proxy: true
      // path: '/var/run/egg.sock',
    }
  };
  config.proxy = false;


  config.bodyParser = {
    enable: true,

    // encoding:'utf-8',
    jsonLimit: "10mb",
    formLimit: "10mb"
  } as any;

  config.security = {
    protocolWhiteList: ["http"],
    // origin: "*",
    domainWhiteList: ["www.airuanjian.vip", "open.weixin.qq.com", "localhost"],
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    xframe: {
      enable: false
    },
    csrf: {
      ignoreJSON: true // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    csp: {
      ignore: () => true
    }
  } as any;
  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      html: "nunjucks"
    },

    root: [
      path.join(appInfo.baseDir, "app/views")
      // path.join(appInfo.baseDir, 'path/to/another'),
    ].join(",")
  } as any;
  config.static = {
    prefix: "/"
  } as any;
  config.oss = {
    client: {
      accessKeyId: "LTAIcMnaxxUG7dbk",
      accessKeySecret: "VhNgQZrGYz7dXpiCUS8r36mbLgy6db",
      bucket: "bangwei-store",
      endpoint: "oss-cn-beijing.aliyuncs.com",
      timeout: "60s"
    }
  };

  return config;
};
