const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const bodyparser = require("koa-bodyparser");
const photos = require("./photos").default;
const music = require("./music").default;
const wxFun = require("./wx/getOpenid").default;
const hasUser = require("./wx/getOpenid").hasUser;

let serverRequest = new Router();

// app.use(async (ctx) => {
//   ctx.body = "Hello World";
// });

serverRequest.get("/photos", (ctx) => {
  ctx.body = photos;
});

const setData = require("./numb").default;
serverRequest.post("/numb", (ctx) => {
  ctx.body = setData(ctx.request.body);
});
serverRequest.get("/getnumb", (ctx) => {
  ctx.body = setData();
});
serverRequest.get("/music", (ctx) => {
  ctx.body = music[0];
});

// 创建用户
serverRequest.post("/createUser", (ctx) => {
  console.log(ctx.request.body);
  ctx.body = setData(ctx.request.body);
});

// 小程序状态 审核期修改为false
serverRequest.get("/state", (ctx) => {
  ctx.body = false;
});

// 获取openid
serverRequest.get("/login", async (ctx) => {
  const res = await wxFun(ctx.query.code);
  const has = hasUser(res.openid);

  if (has) {
    ctx.body = has;
  } else {
    ctx.body = {
      msg: "暂未注册",
      data: res,
    };
  }
});

app.use(bodyparser());

app.use(serverRequest.routes()).use(serverRequest.allowedMethods());

app.listen(3000);
