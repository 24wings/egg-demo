import { Service } from "egg";
import fs = require("fs");
import path = require("path");
var Payment = require("wechat-pay").Payment;
var initConfig = {
  partnerKey: "shadow2016shadow2016shadow2016sh",
  appId: "wx800e2a542b39cf46",
  mchId: "1499196302",
  notifyUrl: "http://airuanjian.vip/wechat/pay-test",
  pfx: fs.readFileSync(path.resolve(__dirname, "../../env/apiclient_cert.p12"))
};
var payment = new Payment(initConfig);

import OAuth = require("wechat-oauth");

var client = new OAuth(
  "wx800e2a542b39cf46",
  "7d1aec534959dc79b518472d66685671"
);
import WechatApi = require("wechat-api");
var api = new WechatApi(
  "wx800e2a542b39cf46",
  "7d1aec534959dc79b518472d66685671"
);

let obj = {};

export default class Wechat extends Service {
  getOauthUrl(urlPath: string, serverHost = "http://www.airuanjian.vip") {
    return client.getAuthorizeURL(
      serverHost + urlPath,
      "state",
      "snsapi_userinfo"
    );
  }
  getWechatUserByCode(code) {
    if (!code) {
      return false;
    }
    return new Promise<any>(resolve => {
      client.getAccessToken(code, function(err, result) {
        if (err) console.log(err);
        // var accessToken = result.data.access_token;
        var openid;
        if (!result.data) {
          openid = obj[code];
        } else {
          openid = result.data.openid;
          obj[code] = openid;
        }

        client.getUser(openid, async function(err, result) {
          if (err) console.log(err);
          var userInfo = result;
          // console.log(userInfo)
          resolve(userInfo);
        });
      });
    });
  }
  /**
   * 获取订单支付参数,用于h5内调起支付参数
   *
   * @param orderData
   */

  getPaymentArgs(orderData: {
    body: string;
    attach: string;
    out_trade_no: string;
    total_fee: number;
    spbill_create_ip: string;
    openid: string;
    trade_type: "JSAPI";
  }) {
    return new Promise(resolve => {
      payment.getBrandWCPayRequestParams(orderData, function(err, payargs) {
        if (err) console.log(err);
        resolve(payargs);
      });
    });
  }

  async getTicket(url: string, debug: boolean = false) {
    console.log(`ticket url:`, url);
    var param = {
      debug: debug,
      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"],
      url
    };
    return new Promise(resolove => {
      api.getJsConfig(param, (err, data) => {
        if (err) console.log(err);
        resolove(data);
      });
    });
  }
}
