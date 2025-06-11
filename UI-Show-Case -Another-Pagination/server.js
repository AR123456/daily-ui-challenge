const fs = require("fs");
const path = require("path");

// const folderPath = path.join(__dirname, "thumbs");
// const images = fs.readdirSync(folderPath).filter((file) => {
//   return /\.(jpe?g|png|gif|webp)$/i.test(file);
// });
// console.log(images);
// const imageArray = `const images=${JSON.stringify(images, null, 2)}`;
// fs.writeFileSync(path.join(__dirname, "thumb-arr.js"), imageArray, "utf8");

// JS to create a json object referencing the thumbs and shows

// Get thumbs and shows directories
const thumbsDir = path.join(__dirname, "thumbs");
const showsDir = path.join(__dirname, "shows");
// Read thumbs
const thumbs = fs.readdirSync(thumbsDir).filter((file) => {
  return /\.(jpg|jpeg|png|gif)$/i.test(file);
});

// Read shows
const shows = fs.readdirSync(showsDir).filter((dir) => {
  return fs.statSync(path.join(showsDir, dir)).isDirectory();
});

// Ensure same length
if (thumbs.length !== shows.length) {
  console.error("Mismatch between thumbs and shows count!");
  process.exit(1);
}

// Build items
const items = thumbs.map((thumb, index) => {
  return {
    image: "./thumbs/" + thumb,
    alt: "#",
    text: "#",
    href: "./shows/" + shows[index] + "/index.html",
  };
});

// Write to JSON file (optional)
fs.writeFileSync("items.json", JSON.stringify(items, null, 2));

console.log("✅ Items array generated!");
