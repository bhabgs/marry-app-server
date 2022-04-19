const fs = require("fs");
const dayjs = require("dayjs");

const redfile = () => {
  const data = fs.readFileSync("./numb/data.json", "utf8");
  return JSON.parse(data);
};

// 查询注册用户
const findUser = (id) => {
  const fileContext1 = redfile();
  if (!id) return false;
  const users = fileContext1.users;
  const hasUser = users.find((res) => res.openId == id);
  return hasUser;
};

// 写文件
const witeFile = (opt) => {
  const fileContext1 = redfile();
  if (!opt) return fileContext1;

  const fileContext = fileContext1.users;

  const hasUser = fileContext.find((res) => res.openId == opt.openId);

  // 如果当前不存在用户
  if (!hasUser) {
    opt.createTime = dayjs().format("DD/MM/YYYY HH:ss:mm");
    fileContext.push(opt);
  } else {
    hasUser.say = opt.say;
    hasUser.name = opt.name;
    hasUser.number = opt.number;
    hasUser.num = opt.num;
    hasUser.createTime = dayjs().format("DD/MM/YYYY HH:ss:mm");
    hasUser.nickName = opt.nickName;
  }

  fs.writeFileSync("./numb/data.json", JSON.stringify(fileContext1));

  return redfile();
};

exports.findUser = findUser;

exports.default = (opt) => {
  const data = witeFile(opt);
  return data;
};
