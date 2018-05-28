import { Application } from "egg";
let pcClientApi = {
  login: "/pc/login"
};

module.exports = (app: Application) => {
  let pcClient = app.controller.pcClient;
  //   let home = app.controller.common;
  app.router
    .post(pcClientApi.login, pcClient.login)
    .get(`/pc/sync-users-by-shop_id`, pcClient.syncUsersByShopId)
    .get(
      `/pc/list-coupin-and-material-by-shop_id`,
      pcClient.listCoupinAndMaterialByShopId
    )
    .post(
      `/pc/sync-users-by-shop_id/complete`,
      pcClient.syncUsersByShopIdComplete
    );
  // .post('/')
};
