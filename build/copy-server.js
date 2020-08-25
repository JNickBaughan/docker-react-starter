const fs = require("fs");
const dir = "dist";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
fs.copyFile("src/server.js", `${dir}/server.js`, (err) => {
  if (err) throw err;
  console.log(`server copied to ${dir} folder`);
});
