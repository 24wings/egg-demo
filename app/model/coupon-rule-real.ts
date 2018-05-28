import { Sequelize, STRING, INTEGER, DATE, Instance } from "sequelize";

interface ICouponRuleReal {
  coupon_id?: number;
  time_limit?: number;
  time_start?: Date;
  time_end?: Date;
  can_give_other?: number;
  reg_give?: number;
  count_limit?: number;
  item_limit?: number;
  avaliable_items?: number;
  can_share?: number;
  shop_id?: number;
  id?: number;
}
type ICouponRuleRealInstance = Instance<ICouponRuleReal> & ICouponRuleReal;
export let CouponRuleReal = (database: Sequelize) => {
  const coupon_rule_real = database.define<
    ICouponRuleRealInstance,
    ICouponRuleReal
  >(
    "coupon_rule_real",
    {
      coupon_id: INTEGER,
      time_limit: INTEGER,
      time_start: DATE,
      time_end: DATE,
      can_give_other: INTEGER,
      reg_give: INTEGER,
      count_limit: INTEGER,
      item_limit: INTEGER,
      avaliable_items: STRING,
      can_share: INTEGER,
      shop_id: INTEGER
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      underscored: true
    }
  );
  coupon_rule_real.removeAttribute("id");
  return coupon_rule_real;
};
