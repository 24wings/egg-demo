import Sequlize = require("sequelize");

let customer = new Sequlize("customer", "misheng", "misheng", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5
  }
});
export let m2centraldb = new Sequlize("m2centraldb", "misheng", "misheng", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5
  }
});

// customer
import { Material } from "./material";
import { CloudinaryImage } from "./cloudinary-image";
import { OSSFile } from "./oss-file";
import { RewardRecord } from "./reward-record";
import { CouponClaim } from "./coupon-claim";
import { CouponReal } from "./coupon-real";
// m2centraldb
import { CouponRuleReal } from "./coupon-rule-real";
import { Shop } from "./shop";
import { SyncUser } from "./sync-users";
import { WxUser } from "./wx-user";
import { User } from "./user";

// customer model
export let materialModel = Material(customer);
export let cloudinaryImageModel = CloudinaryImage(customer);
export let oSSFileModel = OSSFile(customer);
export let rewardRecordModle = RewardRecord(customer);

export let couponClaimModel = CouponClaim(customer);
export let syncUserModel = SyncUser(customer);

// m2 model
export let couponRuleRealModel = CouponRuleReal(m2centraldb);
export let couponRealModel = CouponReal(m2centraldb);
export let shopModel = Shop(m2centraldb);
export let wxUserModel = WxUser(m2centraldb);
export let userModel = User(m2centraldb);
