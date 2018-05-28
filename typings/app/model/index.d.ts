import { Connection } from "mysql";
import * as Sequelize from "sequelize";

// declare type  IShopUserReciveAddressModel=IShopUserReciveAddressModel;
// import * as Sequelize from "sequelize";

// declare type Document = mongoose.Document;
// declare type Model<T extends Document> = Model<T>;
declare module "egg" {
  // interface IUserModel extends Sequelize.Model<>{

  // }

  // interface IUserModel
  /**商户用户收货地址 */

  interface EggApplication {
    Sequelize: Sequelize.SequelizeStatic;
    model: Sequelize.Sequelize;
    mysql: {
      get: (str: "customer" | "m2centraldb") => Connection;
    };
    // mongoose: mongoose.Mongoose;
  }

  //   class Model implements Sequelize.Sequelize {}
  interface Context {
    oss: {
      put: (string, string) => Promise<any>;
      get: (string, string, options: { process?: string }) => Promise<any>;
    };
    model: {
      CouponRuleReal: Sequelize.Model<ICouponRuleRealInstance, ICouponRuleReal>;
      User: Sequelize.Model<IUserInstance, IUser>;
      OssFile: Sequelize.Model<IOssFileInstance, OSSFile>;
      CloudinaryImage: Sequelize.Model<
        ICloudinaryImageInstance,
        ICloudinaryImage
      >;
      RewardRecord: Sequelize.Model<IRewardRecordInstance, IRewardRecord>;
      Material: Sequelize.Model<IMaterialInstance, IMaterial>;
    };
  }
}
