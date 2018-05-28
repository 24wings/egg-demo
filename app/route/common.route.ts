import { Application } from "egg";
// let wechatApi = {
//   getAuthurl: "/getAuthurl",
//   visitorMode: "/visitor/mode",
//   shopUserSignup: "/shopuser/signup",
//   listButtons: "/wechat/list-buttons",
//   createMenu: "/wechat/create-menu",
//   removeMenu: "/wechat/remove-menu",
//   submitShop: "/wx/query-submit-shop"
// };
module.exports = (app: Application) => {
  //   console.log(app);
  let common = app.controller.common;

  app.router
    .get("/common/qrcode", common.getQrcode)
    .post("/common/qrcode", common.getQrcode)
    .get("/wechat/ticket", common.getTicket)
    .get("/common/wechat/ticket", common.getTicket)
    .post("/common/upload/image", common.uploadBase64)
    .get("/common/send-auth-code", common.sendAuthCode);
  // .post("/common/upload/file", common.uploadFile);
};
