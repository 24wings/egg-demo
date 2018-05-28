declare module "wechat-pay" {
  export class PayMent {
    /**
     *
     * 生成用于h5调用微信的支付参数
     *
     *
     */
    getBrandWCPayRequestParams(
      config: {
        body: string;
        attach: string;
        out_trade_no: string;
        total_fee: number;
        spbill_create_ip: string;
        openid: string;
        trade_type: "JSAPI";
      },
      callback: (err: any, payargs: any) => any
    ): void;
    constructor(config: {
      partnerKey: string;
      appId: string;
      mchId: string;
      notifyUrl: string;
      pfx: any;
    });
  }
}
