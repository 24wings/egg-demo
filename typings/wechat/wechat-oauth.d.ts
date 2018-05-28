declare module "wechat-oauth" {
  class OAuth {
    /**
     * 生成微信授权地址
     * @param redirectUrl  授权回调地址
     * @param state 一般为 'state'
     * @param scope  授权类型 静默授权 snsapi_base  认证授权 snsapi_userinfo
     */
    getAuthorizeURL(
      redirectUrl: string,
      state: string,
      scope: "snsapi_userinfo" | "snsapi_base"
    ): string;

    /**
     * PC端网页授权
     *
     * @param redirectUrl
     *
     */
    getAuthorizeURLForWebsite(redirectUrl): string;
    /**
     * 根据授权回调code 拉取用户信息
     *
     * @param code
     * @param callback
     */
    getAccessToken(
      code: string,
      callback: (err: null | any, result: AccessToken) => any
    );
    /**
     * 根据用户openid 来获取用户信息
     *
     * @param openid 用户的opendid
     * @param callback 回调函数,失败时err不为空
     */
    getUser(
      openid: string,
      callback: (err: null | any, result: WechatUser) => any
    );

    constructor(
      appid: string,
      secret: string,
      readCallback?: (openid, callback) => void,
      writeCallback?: (openid, token, callback) => void,
      /**
       * 是否小程序
       */
      isMiniProgram?: boolean
    );
  }
  interface WechatUser {
    openid: string;
    nickname: string;
    sex: string;
    province: string;
    city: string;
    country: string;
    headimgurl: string;
    privilege: string[];
    unionid: string[];
  }

  interface AccessToken {
    data?: { openid: string };
    access_token: string;
    openid: string;
  }
  export = OAuth;
}
