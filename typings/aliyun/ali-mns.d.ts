declare module "ali-mns" {
  /**
   * 账户类
   */
  export class Account {
    getAccountId(): string;
    getOwnerId(): string;
    getKeyId(): string;
    getGA(): string;
    setGA(bGA: boolean);
    getHttps();
    setHttps(bHttps: boolean);

    constructor(accoutId: string, keyId: string, secret: string);
  }
  /**
   * Message Queue
   *
   * 消息队列
   */
  export class MQ {
    /**
     *
     * @param mqName
     * @param account
     * @param region 默认
     */
    constructor(mqName: string, account: Account, region: string);
    sendP(msg: string): Promise<AliMnsSendMessageResponse>;
  }

  export class MQ {
    getName(): string;
    getAccount(): string;
    getRegion(): string;
    getRecvTolerance();
    setRecvTolerance(value: number);
    recvP(waitSeconds?: number): Promise<any>;
    peekP(): Promise<any>;
    deleteP(receiptHandle: string): Promise<any>;

    sendP(msg: string, priority?: number, delaySeconds?: number): Promise<any>;
    reserveP(receiptHandle: string, reserveSeconds: number): Promise<any>;
    notifyRecv(cb: (ex: Error, msg: any) => Boolean, waitSeconds?: number);
    notifyStopP(): Promise<any>;
    getAttrsP(): Promise<any>;
    setAttrsP(options: any): Promise<any>;
    constructor(name: string, account: Account, region?: string | Region);
  }
  export class Msg {
    constructor(msg: string);
  }
  export class Region {
    constructor(city?: string, network?: string, zone?: string);
  }

  export class MQBatch {
    constructor(mqName: string, account: Account, region: string);
  }
  export class Topic {
    getName(): string;
    getAccount(): any;
    getRegion(): string;
    getAttrsP(): Promise<any>;
    setAttrsP(options: any): Promise<any>;
    listP(
      prefix?: string,
      pageSize?: number,
      pageMarker?: string
    ): Promise<any>;
    subscribeP(
      name: string,
      endPoint: string,
      notifyStrategy?: string,
      notifyContentFormat?: string,
      filterTag?: string
    ): Promise<any>;
    unsubscribeP(name: string): Promise<any>;
    publishP(
      msg: string,
      b64: boolean,
      tag?: string,
      attrs?: any,
      options?: any
    ): Promise<any>;
    constructor(name: string, account: Account, region?: string);
  }
}

interface AliMnsSendMessageResponse {
  Message: string;
  MessageId: string;
  MessageMD5: string;
  PublishTime: number;
  Subscriber: string;
  SubscriptionName: string;
  TopicName: string;
  TopicOwner: string;
}
