const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "thumbs");
const images = fs.readdirSync(folderPath).filter((file) => {
  return /\.(jpe?g|png|gif|webp)$/i.test(file);
});
console.log(images);
const imageArray = `const images=${JSON.stringify(images, null, 2)}`;
fs.writeFileSync(path.join(__dirname, "thumb-arr.js"), imageArray, "utf8");
