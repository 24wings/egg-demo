export enum BangweiOrderState {
  Unpay = 1,
  SendProduct, //代发货
  Finish, // 确认收货
  Commented, // 已经评论
  Cancel, // 订单待支付取消
  WaitReciveProduct, // 代收获
  SendProductCancel, // 代发货取消
  WaitProductCancel, // 待收货取消
  ReciveCancel, // 已收货取消
  Close, // 订单奖金派发完毕
  RequestRefound // 申请退款
}
export enum RewardRecordType {
  Register = 1,
  Share
}
export enum BillState {
  Frogen = 1, // 冻结
  UnFrogen, // 解冻
  Cancel // 撤销,订单退款,资金回流，奖金取消
}
export enum FenxiaoUserState {
  WatingVerify = 1, // 待审核
  VerifyPass, // 审核通过
  A, // 正式会员
  Free, //游客
  AA,
  AAA
}

export enum OrderActionState {
  CreateOrderAndWaitPay,
  PayOrderAndAwaitSendProduct,
  SendingProduct,
  ConfirmOrderEnd
}

export enum SubmitShopState {
  Wating = 1,
  Pass,
  Fail
}

export enum SystemActionState {
  FenxiaoSubmitShopPassAction = 1,
  FenxiaoSubmitShopFailAction
}
