import {Context} from'egg';
module.exports =()=>{
    return async (ctx:Context,next)=>{
   
    ctx.set("Access-Control-Allow-Origin", '*');
   
    ctx.set(
      "Access-Control-Allow-Headers",
      "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("Access-Control-Allow-Credentials", "true");
    // ctx.set("X-Powered-By", ' 3.2.1')
    if (ctx.method == "OPTIONS") ctx.body = 200;
    else {
      /*让options请求快速返回*/
      await next();
    }
    }
}