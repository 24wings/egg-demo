import { Sequelize, STRING, BOOLEAN, DATE, INTEGER, Instance } from "sequelize";

interface ICouponClaimRule {
  claim_id?: number;
  coupon_id?: number;
  coupon_name?: string;
  member_id?: number;
  member_name?: string;
  status?: number;
  claimer?: number;
  claim_time?: Date;
  shop_id?: number;
  is_sync?: boolean;
}

type ICouponClaimRuleInstance = Instance<ICouponClaimRule> & ICouponClaimRule;
export let CouponClaim = (database: Sequelize) => {
  const coupon_claim = database.define<
    ICouponClaimRuleInstance,
    ICouponClaimRule
  >(
    "coupon_claim",
    {
      claim_id: INTEGER,
      coupon_id: INTEGER,
      coupon_name: STRING,
      member_id: INTEGER,
      member_name: STRING,
      status: INTEGER,
      claimer: STRING,
      claim_time: DATE,
      shop_id: INTEGER,
      is_sync: { type: BOOLEAN, defaultValue: false }
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      underscored: true
    }
  );
  coupon_claim.removeAttribute("id");
  return coupon_claim;
};
