// cimport { and, or } from "sequelize";
import { Controller } from "egg";
// import { RewardRecordType } from "../../constant";
import db = require("../model");
export default class HomeController extends Controller {
  async getHome() {
    let { ctx } = this;
    let { reward_value, material_id } = ctx.query;
    let material = await db.materialModel.findById(material_id);
    await this.ctx.render("index", { reward_value, material });
  }
  async getAppWebsite() {
    let { ctx } = this;
    let { appName } = ctx.query;
    ctx.redirect(appName);
  }
  async checkWechat() {
    const { ctx } = this;
    ctx.body = ctx.query.echostr;
  }
  public async index() {
    const { ctx } = this;

    let { code, material_id } = ctx.query;

    let material = await db.materialModel.findById(material_id);

    console.log(material_id, material);
    if (!code) {
      console.error("没有code");
    }
    let weUser = {};
    if (code) {
      weUser = await ctx.service.wechat.getWechatUserByCode(code);
      if (!weUser) weUser = {};
    } else {
      weUser = {};
    }
    console.log(`weUser:`, weUser);
    if (weUser) {
      await this.ctx.render("index", { material, weUser });
    } else {
      ctx.body = { ok: false, data: "授权失败" };
    }
  }
  async getAuthUrl() {
    let { ctx } = this;

    await ctx.redirect(
      ctx.service.wechat.getOauthUrl(
        "/?material_id=" +
          ctx.query.material_id +
          (ctx.query.shareuser_id
            ? `&shareuser_id=${ctx.query.shareuser_id}`
            : "")
      )
    );
  }
  async uploadBase64Test() {
    let { ctx } = this;
    let { base64 } = ctx.request.body;
    let result = await ctx.service.oss.uploadImage(base64);
    ctx.body = result;
  }
  async getImage() {
    let { ctx } = this;
    let name = ctx.query.name;
    ctx.body = await ctx.service.oss.getImage(name, "");
  }
  async sendAuthCode() {
    let { ctx } = this;
    if (this.service.common.regexp.phone.test(ctx.query.phone)) {
      await ctx.service.alidayu.sendUserRegisiterAuthCode(ctx.query.phone);
      ctx.body = { ok: true };
    } else {
      ctx.body = { ok: false, data: "不合法的手机号" };
    }
  }
  async signup() {
    let { ctx } = this;
    let {
      phone,
      authcode,
      material_id,
      shareuser_id,
      openid,
      nickname,
      sex,
      // shareurl,
      language,
      city,
      province,
      country,
      headimgurl,
      privilege
    } = ctx.request.body;

    privilege = [];
    let material = await db.materialModel.findById(material_id);
    if (material) {
      if (this.service.common.regexp.phone.test(phone) && phone) {
        let ok = await this.service.alidayu.queryDetail(phone, authcode);
        if (ok) {
          let exsistUser = await db.wxUserModel.findOne({
            where: { phone: phone }
          });
          let trueUser = await db.userModel.findOne({ where: { openid } });
          if (!trueUser && openid) {
            await db.userModel.create({
              openid,
              nick_name: nickname,
              sex,
              photos: headimgurl,
              mobi: phone,
              nation: country,
              password: "123456"
            });
          }
          if (exsistUser) {
            ctx.body = { ok: true, data: exsistUser };
          } else {
            let newUser = await db.wxUserModel.create({
              phone,
              password: "123456",
              openid,
              nickname,
              sex,

              language,
              live_city: city,
              live_province: province,
              nation: country,
              photos: headimgurl,
              privilege: privilege.join(","),
              signup_shop_id: material.shopuser_id
            });
            if (newUser.id) {
              // 分配奖金
              ctx.body = { ok: true, data: "注册成功" };
              let material: any = await db.materialModel.findById(material_id);
              let shareResults;
              let regGiveResults;
              if (material) {
                let rule = await db.couponRuleRealModel.findOne({
                  where: {
                    shop_id: material.shopuser_id,
                    coupon_id: material.coupon_id
                  }
                });
                console.log(`rule`, rule);
                if (rule) {
                  console.log(`分配rule,`, rule);
                  if (rule.can_share == 1 && shareuser_id) {
                    console.log(`分享分配`);
                    let shareUser = await db.wxUserModel.findById(shareuser_id);
                    if (shareUser) {
                      shareResults = await this.service.coupon.giveUserCoupons(
                        material.coupon_id,
                        material.coupon_id,
                        material.shopuser_id,
                        nickname as string
                      );
                    }
                  }
                  if (rule.reg_give == 1) {
                    console.log(`注册分配`, nickname);
                    regGiveResults = await this.service.coupon.giveUserCoupons(
                      material.coupon_id,
                      material.shopuser_id,
                      newUser.id,
                      nickname as string
                    );
                  }
                }
                console.log(shareResults, regGiveResults);
                ctx.body = { ok: true, data: newUser };
              } else {
                ctx.body = { ok: false, data: "未知的错误" };
              }
            }
          }
        }
      } else {
        ctx.body = { ok: false, data: "验证码错误" };
      }
    } else {
      ctx.body = { ok: false, data: "信息不完善" };
    }
  }

  async createMaterial() {
    let { ctx } = this;
    console.log(ctx.request.body);
    let {
      shopuser_id,
      home_image_url,
      ticket_image_url,
      share_image_url,

      coupon_id
    } = ctx.request.body;

    if (shopuser_id && home_image_url && ticket_image_url) {
      let shopuser = await db.shopModel.findOne({
        where: { shop_id: shopuser_id }
      });
      if (shopuser) {
        let exist = await db.materialModel.findOne({
          where: { shopuser_id, coupon_id }
        });
        if (!exist) {
          let newMaterial = await db.materialModel.create({
            coupon_id,
            shop_phone: shopuser.telphone,
            shopuser_id,
            home_image_url,
            ticket_image_url,
            share_image_url
          });
          ctx.body = { ok: true, data: newMaterial };
        } else {
          let update = await db.materialModel.update(
            { home_image_url, ticket_image_url, share_image_url },
            { where: { shopuser_id, coupon_id } }
          );
          ctx.body = { ok: true, data: update };
        }
      }
    } else {
      ctx.body = { ok: false, data: "缺少参数" };
    }
  }
  async getMaterial() {
    let { ctx } = this;
    let { material_id } = ctx.query;

    if (material_id) {
      let material = await db.materialModel.findById(material_id);

      if (material) {
        let shopuser = await db.shopModel.findOne({
          where: { shop_id: material.shopuser_id }
        });

        ctx.body = {
          ok: true,
          data: {
            material,
            shopuser,

            shop_id: material.shopuser_id,
            coupon_id: material.coupon_id
          }
        };
      } else {
        ctx.body = { ok: false, data: `未知的素材` };
      }
    } else {
      ctx.body = { ok: false, data: "" };
    }
  }
  async updateMaterial() {
    let { ctx } = this;
    let { material_id } = ctx.query;
    let body = ctx.request.body;
    if (material_id) {
      let material = await db.materialModel.findById(material_id);
      if (material) {
        await db.materialModel.update(body);
        ctx.body = { ok: true, data: "更新成功" };
      } else {
        ctx.body = { ok: false, data: "未知的素材" };
      }
    } else {
      ctx.body = { ok: false, data: "缺少参数 material_id" };
    }
  }
  async listMaterial() {
    let { ctx } = this;
    let { shop_id } = ctx.query;
    if (shop_id) {
      let materials = await this.service.coupon.getCouponAndMaterialByShopId(
        shop_id
      );
      /**
       *  await db.materialModel.findAll({
        where: { shopuser_id: shop_id }
      });
       */
      ctx.body = { ok: true, data: materials };
    } else {
      ctx.body = { ok: false, data: "参数缺省" };
    }
  }
  async getShopTickets() {
    let { ctx } = this;
    let { shop_id, size } = ctx.query;
    if (size) {
      size = parseInt(size);
    } else {
      size = 100;
    }
    if (shop_id && size) {
      let tickets = await db.couponClaimModel.findAll({
        where: { shop_id, is_sync: false },
        limit: size
      });
      ctx.body = { ok: true, data: tickets };
    } else {
      ctx.body = { ok: false, data: "参数不全" };
    }
  }
  async getTciketsByKeyword() {
    let { ctx } = this;
    let { keyword, shop_id } = ctx.query;
    if (keyword && shop_id) {
      // ctx.my
      let claims = await ctx.app.mysql
        .get("customer")
        .query(
          `SELECT * FROM  coupon_claim left JOIN users on  coupon_claim.member_id = users.user_id  where users.nickname like '%${keyword}%' or users.user_name like '%${keyword}%' or users.phone like '%${keyword}%' and  shop_id=${shop_id}`
        );

      ctx.body = { ok: true, data: claims };
    } else {
      ctx.body = { ok: false, data: "参数不合法" };
    }
  }
  async syncTicketsData() {
    let { shop_id } = this.ctx.query;
    let { had_sync_ids } = this.ctx.request.body;
    if (!had_sync_ids) had_sync_ids = [];

    let claims = await db.couponClaimModel.findAll({
      where: {
        shop_id,
        claim_id: {
          $notIn: had_sync_ids
        }
      }
    });
    this.ctx.body = { ok: true, data: claims };
  }
  async syncTicketsDataComplete() {
    let { ctx } = this;
    let { shop_id } = ctx.query;
    let { completeIds } = ctx.request.body;
    if (!completeIds) completeIds = [];
    let update = await db.couponClaimModel.update(
      { is_sync: true },
      {
        where: {
          shop_id,
          claim_id: {
            $in: completeIds
          }
        }
      }
    );
    ctx.body = { ok: true, data: update };
  }
  message() {
    let { ctx } = this;
    console.log(ctx.request.body, ctx.query);
  }
}
