// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Alidayu from '../../../app/service/alidayu';
import Common from '../../../app/service/common';
import Coupon from '../../../app/service/coupon';
import Mns from '../../../app/service/mns';
import Oss from '../../../app/service/oss';
import Qrcode from '../../../app/service/qrcode';
import Test from '../../../app/service/Test';
import Wechat from '../../../app/service/wechat';

declare module 'egg' {
  interface IService {
    alidayu: Alidayu;
    common: Common;
    coupon: Coupon;
    mns: Mns;
    oss: Oss;
    qrcode: Qrcode;
    test: Test;
    wechat: Wechat;
  }
}
