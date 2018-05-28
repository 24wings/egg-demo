import { Service } from "egg";
import db = require("../model");

export default class Coupon extends Service {
  /**
   * 给用户分发优惠券
   * 1.根据优惠券的 coupon_id 查找到 对应的多张优惠券
   *
   */
  async giveUserCoupons(
    coupon_id: number,
    shop_id: number,
    userid: number,
    member_name: string
  ) {
    console.log(`准备开始送券之旅`, coupon_id);
    let tickets = await db.couponRealModel.findAll({
      where: {
        coupon_id,
        shop_id
      }
    });
    for (let ticket of tickets) {
      // 1.判断优惠券是否过期

      let isValidate =
        new Date(ticket.start_date).getTime() +
          ticket.valid_days * 24 * 60 * 60 * 1000 >
        new Date().getTime();
      console.log(`是否有效券` + isValidate);
      if (isValidate) {
        await db.couponClaimModel.create({
          shop_id: shop_id,
          coupon_id: coupon_id,
          member_id: userid,
          claim_time: new Date(),
          coupon_name: ticket.coupon_name,
          member_name,
          status: 0,
          claimer: 123
        });
      }
    }
  }
  getCouponAndMaterialByShopId(shop_id: string) {
    return this.app.mysql
      .get("customer")
      .query(
        `select * from  customer.materials join m2centraldb.coupon_rule_real on customer.materials.coupon_id= coupon_rule_real.coupon_id where shop_id =?`,
        [shop_id]
      );
  }
}
