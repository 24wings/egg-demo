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
  let home = app.controller.home;

  app.router
    .get("/auth", home.index)
    .get("/", home.index)
    .get("/authUrl", home.getAuthUrl)
    .post("/test/upload", home.uploadBase64Test)
    .get("/getImage", home.getImage)
    .get("/getAuthCode", home.sendAuthCode)
    .post("/signup", home.signup)
    .post("/create-material", home.createMaterial)
    .get("/material", home.getMaterial)
    .get("/pc/list-shop-materials", home.listMaterial)
    .post("/pc/update-shop-material", home.updateMaterial)
    .get("/pc/get-shop-tickets", home.getShopTickets)
    .get("/pc/get-tickets-by-keyword", home.getTciketsByKeyword)
    .post("/pc/sync-tickets-data-complete", home.syncTicketsDataComplete)
    .post(`/pc/sync-shop-tickets-data`, home.syncTicketsData)
    .all("/message", home.message);
};
