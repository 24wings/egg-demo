declare module "@alicloud/sms-sdk" {
  /**
   
     *
     *
     * |Code|	描述|
     * |---|---|
     * |OK	|请求成功|
     * |isp.RAM_PERMISSION_DENY|	RAM权限DENY|
     * |isv.OUT_OF_SERVICE|业务停机|
     *  |isv.PRODUCT_UN_SUBSCRIPT|未开通云通信产品的阿里云客户|
     * |isv.PRODUCT_UNSUBSCRIBE	|产品未开通|
     * |isv.ACCOUNT_NOT_EXISTS	 |账户不存在|
     * |isv.ACCOUNT_ABNORMAL |	账户异常|
     * |isv.SMS_TEMPLATE_ILLEGAL|	短信模板不合法|
     * |isv.SMS_SIGNATURE_ILLEGAL|	短信签名不合法|
     * |isv.INVALID_PARAMETERS|	参数异常|
     * |isp.SYSTEM_ERROR|	系统错误|
     * |isv.MOBILE_NUMBER_ILLEGAL|	非法手机号|
     * |isv.MOBILE_COUNT_OVER_LIMIT|	手机号码数量超过限制|
     * |isv.TEMPLATE_MISSING_PARAMETERS|	模板缺少变量|
     * |isv.BUSINESS_LIMIT_CONTROL|	业务限流|
     * |isv.INVALID_JSON_PARAM	|JSON参数不合法，只接受字符串值|
     * |isv.BLACK_KEY_CONTROL_LIMIT|	黑名单管控|
     * |isv.PARAM_LENGTH_LIMIT|	参数超出长度限制|
     * |isv.PARAM_NOT_SUPPORT_URL|	不支持URL|
     * |isv.AMOUNT_NOT_ENOUGH|	账户余额不足|
     */

  type Code = string;
  interface SendSMSResponse {
    /**
     * 请求id，不知道有何卵用
     */
    RequestId: string;
    Code: Code;
    Message: string;
    /**
     * 短信流水号id
     *
     * 发送回执ID,可根据该ID查询具体的发送状态
     *
     */
    BizId: string;
  }
  interface QuerySendDetailsResponse {
    /**
     * 	8906582E-6722	请求ID
     */
    RequestId: string;
    /**
     * String	OK	状态码-返回OK代表请求成功,其他错误码详见错误码列表
     */
    Code: Code;
    /**
     * 请求成功	状态码的描述
     */
    Message: string;
    /**
     * 发送总条数
     */
    TotalCount: number;
    /**
     * -	发送明细结构体,详见Demo样例
     */
    SmsSendDetailDTOs: {
      SmsSendDetailDTO: ISmsSendDetailDTO[];
    };
  }
  interface ISmsSendDetailDTO {
    /**
     * 	13000000000	手机号码
     */
    PhoneNum: string;
    /**
     * 	1	发送状态 1：等待回执，2：发送失败，3：发送成功
     *
     */
    SendStatus: number;
    /**
     * String	DELIVERED	运营商短信错误码
     */
    ErrCode: string;
    /**
     * String	SMS_000	模板ID
     */
    TemplateCode: string;
    /**
     * 	String	【阿里云】你好！	短信内容
     */
    Content: string;
    /**
     * 	Object	2017-05-25 00:00:00	发送时间
     */
    SendDate: string;
    /**
     * String	2017-05-25 00:00:00	接收时间
     */
    ReceiveDate: string;
    /**
     * 	String	123	外部流水扩展字段
     */
    OutId: string;
  }

  export = class SMSClient {
    /**
     * PhoneNumbers 手机号
     *
     * SignName  签名id
     *
     * TemplateCode 模板id
     *
     * TemplateParam 模板参数 json字符串  {"code":"12345"}
     *
     * OutId? 外部流水扩展字段
     */
    sendSMS: (
      params: {
        PhoneNumbers: string;
        SignName: string;
        TemplateCode: string;
        TemplateParam: string;
        OutId?: string;
      }
    ) => Promise<SendSMSResponse>;
    /**
     *
     * PhoneNumber:手机号
     *
     * SendDate 发送日期 格式如20170731
     *
     * PageSize 页面数 10
     *
     * CurrentPage 当前页面  1
     *
     * */
    queryDetail(params: {
      PhoneNumber: string;
      SendDate: string;
      PageSize: string;
      CurrentPage: string;
      BizId?: string;
    }): Promise<QuerySendDetailsResponse>;
    constructor({ accessKeyId: string, secretAccessKey: string });
  };
}
