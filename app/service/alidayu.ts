import { Service } from "egg";
// import SMSClien = require("@alicloud/sms-sdk");

import SMSClient = require("@alicloud/sms-sdk");
const accessKeyId = "LTAIcMnaxxUG7dbk";
const secretAccessKey = "VhNgQZrGYz7dXpiCUS8r36mbLgy6db";

let smsClient = new SMSClient({ accessKeyId, secretAccessKey });
let signature = {
  bangwei: "邦为科技"
};
let templateCodes = {
  bangweiUserAuthCode: "SMS_127158851", // 验证码
  bangweiRegisterRequest: "SMS_130915509", // 短信通知
  bangweiVerifyPass: "SMS_130920608" // 初审通过 ,邀请来邦为面试
};
export default class Alidayu extends Service {
  /** 生成随机二维码 */
  private getRandomCode() {
    return (Math.random() * 10000).toFixed(0);
  }

  async sendUserRegisiterAuthCode(Phone: string, code?: string) {
    if (!code) {
      code = this.getRandomCode();
    }
    return smsClient.sendSMS({
      PhoneNumbers: Phone,
      SignName: signature.bangwei,
      TemplateCode: templateCodes.bangweiUserAuthCode,
      TemplateParam: `{"code":"${code}"}`,
      OutId: code
    });
  }

  async queryDetail(phone: string, authcode: string): Promise<boolean> {
    let res = await smsClient.queryDetail({
      PhoneNumber: phone,
      SendDate: new Date().format("yyyyMMdd"),
      PageSize: "10",
      CurrentPage: "1"
    });
    if (res.Code == "OK") {
      let detail = res.SmsSendDetailDTOs.SmsSendDetailDTO[0];
      if (detail) {
        return detail.OutId == authcode;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
