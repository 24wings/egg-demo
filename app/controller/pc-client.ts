// cimport { and, or } from "sequelize";
import { Controller } from "egg";
// import { RewardRecordType } from "../../constant";
import db = require("../model");

export default class PcClientController extends Controller {
  async login() {
    let { ctx } = this;
    let { shop_id, password } = ctx.request.body;
    let result: any = <any>await this.app.mysql
      .get("m2centraldb")
      .query(
        `SELECT user.user_id as shop_id FROM shop left join user on shop.shop_id = user.user_id where shop.shop_id = ${shop_id} and user.password =${password};`
      );

    if (result.length > 0) {
      console.log(result);
      ctx.body = { ok: true, data: result[0] };
    } else {
      ctx.body = { ok: false, data: "用户名或密码错误" };
    }
  }
  async syncUsersByShopId() {
    let { ctx } = this;
    let { shop_id, size } = ctx.query;

    let had_sync_users = await db.syncUserModel.findAll({
      where: { shop_id, is_sync: true }
    });
    if (!had_sync_users) had_sync_users = [];

    let had_sync_ids = had_sync_users.map(user => user.user_id);
    console.log(had_sync_ids);
    size = size ? parseInt(size) : 100;
    if (shop_id) {
      let shops = await db.m2centraldb.query(`
      
      select  
      user.user_id,
      wx_users.nickname as username,
      wx_users.nickname as nickname ,
      user.password,
      user.password_hash,
      user.id_card,
      user.sex,
      user.mobi,
      user.qq,
      user.register_time,
      user.user_type,
      user.nation,
      user.birthday,
      user.marital,
      user.native_place,
      user.education,
      user.id_card_addr,
      user.live_province,
      user.live_city,
      user.live_addr,
      user.height,
      user.weight,
      user.speciality,
      user.description,
      wx_users.photos as photos,
      wx_users.updated_at as update_time
      
      
      
      from 
       user  right join  wx_users on wx_users.user_id =user.user_id  where wx_users.user_id not in (${had_sync_ids.join(
         ","
       )})
            
      `);
      ctx.body = { ok: true, data: shops };
    } else {
      ctx.body = { ok: false, data: "参数缺少 shop_id" };
    }
  }
  async syncUsersByShopIdComplete() {
    let { ctx } = this;
    let { shop_id } = ctx.query;
    let { completedIds } = ctx.request.body;

    if (!completedIds) completedIds = [];
    if (completedIds) {
      let syncusers = (completedIds as number[]).map(user_id => {
        return { shop_id: shop_id, user_id, is_sync: true };
      });
      let syncUsers = await db.syncUserModel.bulkCreate(syncusers);
      ctx.body = { ok: true, data: syncUsers };
    } else {
      ctx.body = { ok: false, data: "参数缺少" };
    }
  }
  async listCoupinAndMaterialByShopId() {
    let { shop_id } = this.ctx.query;
    let result: any = <any>await this.app.mysql
      .get("m2centraldb")
      .query(
        `SELECT * FROM coupon_rule_real left join customer.materials on coupon_rule_real.coupon_id= customer.materials.coupon_id where shop_id = ${shop_id}`
      );
    this.ctx.body = { ok: true, data: result };
  }
}
