import fs = require('fs');
import path = require('path');
import db = require('../model');
import { Context } from './util'
import { resolve } from 'url';

/**bangwei123. */

var Payment = require('wechat-pay').Payment;
var initConfig = {
    partnerKey: "shadow2016shadow2016shadow2016sh",
    appId: "wx800e2a542b39cf46",
    mchId: "1499196302",
    notifyUrl: "http://airuanjian.vip/wechat/pay-test",
    pfx: fs.readFileSync(path.resolve(__dirname, '../../env/apiclient_cert.p12'))
};
var payment = new Payment(initConfig);



const wechatKoa = require('co-wechat');



var wechat = require('wechat');
var config = {
    token: 'shadow2016',
    appid: 'wx800e2a542b39cf46',
    encodingAESKey: 'FXarAzXe3huCmtGkQhaEcmOYyplQ1HGKpf2wJyJRNFR',
    checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false 
};

var WechatApi = require('wechat-api');
// var api = new WechatApi("wx615dbd1b14c5053d", "1fc1e1fd93080ae90b412d78167a1e54");
var api = new WechatApi("wx800e2a542b39cf46", "7d1aec534959dc79b518472d66685671");
var OAuth = require('wechat-oauth');
var client = new OAuth('wx800e2a542b39cf46', '7d1aec534959dc79b518472d66685671');

export let wechatRouter = {
    // 微信授权登陆回掉链接生成,url 为回掉的地址 如 /visitor/mode
    getAuthurl: async (ctx) => {
        let urlPath = ctx.query.url ? ctx.query.url : '/visitor/mode';// 默认分销商户访问者模式登陆
        var oauthUrl = client.getAuthorizeURL('http://airuanjian.vip' + urlPath, 'state', 'snsapi_userinfo');
        // res.headers('');
        console.log(oauthUrl);
        ctx.body = oauthUrl
    },
    /** /wechat/login-bangwei-shop */
    loginShopWithWechat: async (ctx: Context) => {
        let code = ctx.query.code;
        let shopUserId = ctx.query.shopUserId;

        if (!code || !shopUserId) {
            return ctx.body = { ok: false, data: '授权失败,请重新登陆' }
        }
        let weUser = await new Promise<any>(resolve => {
            client.getAccessToken(code, function (err, result) {
                var accessToken = result.data.access_token;
                var openid = result.data.openid;
                client.getUser(openid, async function (err, result) {
                    var userInfo = result;
                    console.log(userInfo)
                    resolve(userInfo)
                });
            })
        });

        // 查找用户是否存在
        let existUser = await db.fenxiao.shopUserModel.findByIdAndUpdate(ctx.query.shopUserId, { openid: weUser.openid }).exec()

        await ctx.redirect(`http://shopclient.airuanjian.vip/?shopUserId=${shopUserId}`)
    },

    visitorMode: async (ctx) => {
        let code = ctx.query.code;
        if (!code) {
            return ctx.body = { state: 500, err: 'error , no code found' };
        }
        let weUser = await new Promise<any>(resolve => {
            client.getAccessToken(code, function (err, result) {
                var accessToken = result.data.access_token;
                var openid = result.data.openid;
                client.getUser(openid, async function (err, result) {
                    var userInfo = result;
                    console.log(userInfo)
                    resolve(userInfo)
                });
            })
        });
        ctx.body = weUser;
        // 查找用户是否存在
        let existUser = await db.fenxiao.fenxaioUserModel.findOne({ openid: weUser.openid }).exec()
        if (existUser) {
            // ctx.body = "用户已存在"
        } else {
            //当用户不存在，保存用户，添加信息
            weUser.state = 4;
            existUser = await new db.fenxiao.fenxaioUserModel(weUser).save()
            // ctx.body = { ok: true, data: newFenxiaoUser }
        }
        console.log(`http://bangweishop.airuanjian.vip?redirectUrl=/pages/fx/found&&fxUserId=${existUser._id}`);
        await ctx.redirect(`http://bangweishop.airuanjian.vip?redirectPage=found&&fxUserId=${existUser._id}`)
    },
    // 微信
    wechatTicket: async (ctx: Context, next) => {
        // let str = fs.readFileSync(path.resolve(__dirname, '../../../times.txt'), 'utf8');
        // let times = str ? parseInt(str) : 0;
        // fs.writeFileSync(path.resolve(__dirname, '../../../times.txt'), ++times, { encoding: 'utf8' });
        var param = {
            debug: false,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
            url: ctx.request.body.url
        };
        var config = await new Promise(resolove => {
            api.getJsConfig(param, (err, data) => resolove(data));
        });
        ctx.body = { ok: true, data: config };
        console.log(config);

        // let jssdk = await wechat.wechatApi.getJSSDK({url:"http://www.carelifeca.com/"});
        console.log('jssdk:url', ctx.request.body.url)
        console.log('jssdk:href', ctx.request.body.url);
    },
    //商户注册 微信授权回掉
    shopUserSignup: async (ctx, next) => {
        let code = ctx.query.code;
        if (!code) {
            return ctx.send(500, 'error , no code found');
        }
        let weUser = await new Promise<any>(resolve => {
            client.getAccessToken(code, function (err, result) {
                var accessToken = result.data.access_token;
                var openid = result.data.openid;
                client.getUser(openid, async function (err, result) {
                    var userInfo = result;
                    console.log(userInfo)
                    resolve(userInfo)
                });
            })
        });
        let exisitShopUser = await db.fenxiao.shopUserModel.findOne({ openid: weUser.openid }).exec();
        if (exisitShopUser) {
            ctx.body = exisitShopUser;
        } else {
            exisitShopUser = await new db.fenxiao.shopUserModel(weUser).save();
        }
        ctx.body = exisitShopUser;
        await next();
    },
    replay: wechatKoa(config).middleware(async (message, ctx) => {
        console.log(message);
        // 微信输入信息就是这个 message
        if (message.FromUserName === 'diaosi') {
            // 回复屌丝(普通回复)
            return 'hehe';
        } else if (message.FromUserName === 'text') {
            //你也可以这样回复text类型的信息
            return {
                content: 'text object',
                type: 'text'
            };
        } else if (message.FromUserName === 'hehe') {
            // 回复一段音乐
            return {
                type: "music",
                content: {
                    title: "来段音乐吧",
                    description: "一无所有",
                    musicUrl: "http://mp3.com/xx.mp3",
                    hqMusicUrl: "http://mp3.com/xx.mp3"
                }
            };
        } else if (message.FromUserName === 'kf') {
            // 转发到客服接口
            return {
                type: "customerService",
                kfAccount: "test1@test"
            };
        } else {
            // 回复高富帅(图文回复)
            return [
                {
                    title: '你来我家接我吧',
                    description: '这是女神与高富帅之间的对话',
                    picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                    url: 'http://nodeapi.cloudfoundry.com/'
                }
            ];
        }
    }),
    listButtons: async (ctx: Context) => {
        console.log('list buttons')
        let data = await new Promise<any>(resolve => {
            api.getMenu((err, data) => {
                if (err) resolve(false)
                resolve(data);
            })
        });
        if (data) {
            ctx.body = { ok: true, data }

        } else {
            ctx.body = { ok: false, data }
        }

    },
    createMenu: async (ctx: Context) => {
        /**注意 buttons 必须是 {button:[]}数据结构 */
        let buttons = ctx.request.body;
        if (buttons.button && Array.isArray(buttons.button)) {

            let createAction = await new Promise(resolve => {
                api.createMenu(buttons, (err, data) => {
                    if (err) console.log(err);
                    resolve(data);
                })

            });
            ctx.body = { ok: true, data: createAction };
        } else {
            ctx.body = { ok: false, data: "数据结构错误" }
        }
    },
    removeMenu: async (ctx: Context) => {
        let removeAction = await new Promise(resolve => {
            api.removeMenu((err, data) => {
                if (err) console.log(err);
                resolve(data)
            })
        });
        ctx.body = { ok: true, data: removeAction };
    },

    /**上传永久素材 */
    uploadMaterial: async (ctx: Context) => {
        let { filename } = ctx.query;
        let file = ctx.request.body;
        let fileType = "images"; // 默认图片素材
        let uploadDir = path.resolve(__dirname, '../../www/upload');
        let distFilePath = path.resolve(uploadDir, filename);
        fs.writeFileSync(distFilePath, file);
        let ext: string = filename.split('.').pop();
        let source;
        switch (ext) {
            case 'png':
            case 'jpg':
            case 'jpeg':
                fileType = "image";
                source = await new Promise(resolve => {
                    api.uploadImageMaterial(distFilePath, (err, data) => {
                        if (err) console.log(err);
                        resolve(data);
                    })

                });

                break;
            case 'mp3':
            case 'wmv':
                source = await new Promise(resolve => {
                    api.uploadVoiceMaterial(distFilePath, (err, data) => {
                        if (err) console.log(err);
                        resolve(data);
                    })
                });
                break;
            //缩略图
            case 'mp4':
            case "3gp":
                source = await new Promise(resolve => {
                    api.uploadVideoMaterial(distFilePath, (err, data) => {
                        if (err) console.log(err);
                        resolve(data);
                    })
                });
                break;

            //图文
            default:
                source = await new Promise(resolve => {
                    api.uploadThumbMaterial(distFilePath, (err, data) => {
                        if (err) console.log(err);
                        resolve(data);
                    });
                });
                break;
        }
        ctx.body = { ok: true, data: source }



    },
    getMaterialCount: async (ctx: Context) => {
        let counts = await new Promise(resolve => {
            api.getMaterialCount((err, data) => {
                if (err) console.log(err);
                resolve(data)
            });
        });
        ctx.body = { ok: true, data: counts };
    },
    getMaterials: async (ctx: Context) => {
        let { type, offset, count } = ctx.query;
        let result = await new Promise(resolve => {
            api.getMaterials(type, offset, count, (err, data) => {
                if (err) console.log(err);
                resolve(data);
            });
        });
        ctx.body = { ok: true, data: result };

    },

    getJSTicket: async (ctx: Context) => {
        let ticket = await new Promise(resolve => {
            api.getTicket((err, data) => {
                if (err) console.log(err);
                resolve(data);
            })
        });
        ctx.body = { ok: true, data: ticket };
    },

    getJsConfig: async (ctx: Context) => {
        var param = {
            debug: true,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
            url: 'http://liusi.airuanjian.vip'
        };
        let jsConfig = await new Promise(resolve => {
            api.getJsConfig(param, (err, data) => {
                if (err) console.log(err);
                resolve(data);
            });
        });
        ctx.body = { ok: true, data: jsConfig };
    },
    getWechatPay: async (ctx: Context) => {
        let ip = ctx.ip
        console.log(ctx.ip);

        if (ctx.ip.startsWith('::ffff:')) ip = ctx.ip.replace('::ffff:', '')
        var order = {
            body: '吮指原味鸡 * 1',
            attach: '{"部位":"三角"}',
            out_trade_no: 'kfc' + (+new Date),
            total_fee: ctx.query.money,
            spbill_create_ip: ip,
            openid: 'oofanwirPTl9vxvPSrXvmqjIJxpM',
            trade_type: 'JSAPI'
        };
        let data = await new Promise(resolve => {
            payment.getBrandWCPayRequestParams(order, function (err, payargs) {
                if (err) console.log(err)
                resolve(payargs);
            });
        });
        ctx.body = { ok: true, data }
    },

    /**
     * 支付红包
     */
    sendRedPacket: async (ctx: Context) => {
        let ip = ctx.ip
        console.log(ctx.ip);

        if (ctx.ip.startsWith('::ffff:')) ip = ctx.ip.replace('::ffff:', '')
        let money = ctx.query.money;
        if (!money) money = 100;
        let data = await new Promise(resolve => {
            payment.sendRedPacket({
                mch_billno: 'kfc002',
                send_name: '肯德基',
                re_openid: 'oofanwirPTl9vxvPSrXvmqjIJxpM',
                total_amount: 100,
                total_num: 1,
                wishing: '祝多多吃鸡',
                client_ip: ip,
                act_name: '吃鸡大奖赛',
                remark: '记得吐骨头',
                // scene_id: 'PRODUCT_1'
            }, (err, result) => {
                if (err) console.log(err);
                resolve(result);
                /**
                 * 微信收到正确的请求后会给用户发红包，用户不必关注公众号也能收到。
                 * 红包没有通知回调，有需要的话标记订单状态，和有err的时候记录一下以便排查
                 */
            });

        })
        ctx.body = { ok: true, data };


    }




}