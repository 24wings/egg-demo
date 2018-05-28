declare var WeixinJSBridge: IWeixinJSBridge;
interface IWeixinJSBridge {
  invoke(
    api: string,
    payargs: any,
    callback: (res: { err_msg: string }) => void
  ): void;
}
