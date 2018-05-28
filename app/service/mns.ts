import { Service } from "egg";
let enpoint = `http://1770567526081147.mns.cn-hangzhou.aliyuncs.com/`;
const accessKeyId = "LTAIcMnaxxUG7dbk";
const secretAccessKey = "VhNgQZrGYz7dXpiCUS8r36mbLgy6db";
var AliMNS = require("ali-mns");
var account = new AliMNS.Account(
  "1770567526081147",
  accessKeyId,
  secretAccessKey
);
var mq = new AliMNS.MQ("groupA", account, "hangzhou");
// send message
mq.sendP("Hello ali-mns").then(console.log, console.error);
// var account = new AliMNS.Account(
//   "<your-owner-id>",
//   "<your-key-id>",
//   "<your-key-secret>"
// );
export default class Mns extends Service {
  index() {
    console.log(enpoint, account);
  }
}
