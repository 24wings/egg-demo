import { Controller } from "egg";

export default class Wechat extends Controller {
  /**
   * 接入微信 ,直接返回 echostr
   * 需要配置 根请求 /
   */
  accept() {
    let { ctx } = this;
    let { echostr } = ctx.query;
    ctx.body = echostr;
  }
}
