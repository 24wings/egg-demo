import { Controller } from "egg";

export default class Common extends Controller {
  /**get请求 */
  async getQrcode() {
    let { ctx } = this;
    let { type } = ctx;
    if (!type) type = "base64";

    let url: string;
    if (ctx.method.toLowerCase() == "get") {
      url = ctx.query.url;
    } else {
      url = ctx.request.body.url;
    }
    let data = await this.service.qrcode.urlToQrcode(url, type as any);
    ctx.body = { ok: true, data, prefix: "data:image/png;base64," };
  }
  /***
   * 微信获取jssdk ticket
   *
   */
  async getTicket() {
    let { ctx } = this;
    let { url } = ctx.query;
    let ticket = await this.service.wechat.getTicket(url, false);
    // console.log(ticket);
    ctx.body = { ok: true, data: ticket };
  }
  /**
   * 上传base64图片
   *
   */
  async uploadBase64() {
    let { ctx } = this;
    let { base64 } = ctx.request.body;
    let result = await ctx.service.oss.uploadImage(base64);
    ctx.body = { ok: true, data: result };
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
}
