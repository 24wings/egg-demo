import { Context } from "egg";
module.exports = () => {
  return async function(ctx: Context, next) {
    // console.log(ctx.headers);
    const startTime = Date.now();
    await next();
    // 上报请求时间
    ctx.set("x-response-time", Date.now() - startTime + "ms");
  };
};
