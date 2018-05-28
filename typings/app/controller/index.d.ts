// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Common from '../../../app/controller/common';
import Home from '../../../app/controller/home';
import PcClient from '../../../app/controller/pc-client';
import Wechat from '../../../app/controller/wechat';

declare module 'egg' {
  interface IController {
    common: Common;
    home: Home;
    pcClient: PcClient;
    wechat: Wechat;
  }
}
