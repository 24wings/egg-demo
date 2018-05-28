import { Application } from "egg";

export default (app: Application) => {
  // app.
  // require("./route/bangwei-shop.route")(app);
  // require('./route/bangwei-admin.route')(app);
  require("./route/home.route")(app);
  require("./route/common.route")(app);
  require("./route/pc-client.route")(app);
  // require('./route/fenxiao-admin.route')(app)
};
