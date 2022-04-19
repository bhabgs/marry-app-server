const axios = require("axios");
const config = require("./config").default;
const findUser = require("../numb").findUser;
const jscode2session = async (code) => {
  const res = await axios.get(
    `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`
  );
  return res.data;
};

exports.hasUser = (id) => {
  return findUser(id);
};

exports.default = jscode2session;
