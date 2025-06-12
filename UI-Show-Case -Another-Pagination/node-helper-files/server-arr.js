const fs = require("fs");
const path = require("path");

// const folderPath = path.join(__dirname, "thumbs");
// const images = fs.readdirSync(folderPath).filter((file) => {
//   return /\.(jpe?g|png|gif|webp)$/i.test(file);
// });
// console.log(images);
// const imageArray = `const images=${JSON.stringify(images, null, 2)}`;
// fs.writeFileSync(path.join(__dirname, "thumb-arr.js"), imageArray, "utf8");

//directories
const thumbsDir = path.join(__dirname, "thumbs");
const showsDir = path.join(__dirname, "shows");

// read thumbs
const thumbs = fs
  .readdirSync(thumbsDir)
  .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));
// read shows
const shows = fs.readdirSync(showsDir).filter((dir) => {
  return fs.statSync(path.join(showsDir, dir)).isDirectory();
});
// ensure same length
if (thumbs.length !== shows.length) {
  console.error("Mismatch between thumbs and shows count!");
  process.exit(1);
}

// Build items array
const items = thumbs.map((thumb, index) => {
  // Generate alt text by removing extension and replacing dashes/underscores with spaces
  const altText = path
    .basename(thumb, path.extname(thumb))
    .replace(/[-_]/g, " ");

  // Generate text (for now, using placeholder or numbering)
  const displayText = `Item ${index + 1}`;

  return {
    image: `./thumbs/${thumb}`,
    alt: altText,
    text: displayText,
    href: `./shows/${shows[index]}/index.html`,
  };
});
// create js file with array
const output = `const items = [\n${items
  .map(
    (item) =>
      `  {\n` +
      `    image: "${item.image}",\n` +
      `    alt: "${item.alt}",\n` +
      `    text: "${item.text}",\n` +
      `    href: "${item.href}",\n` +
      `  },`
  )
  .join("\n")}\n];\n`;

// Write to items-arr.js
fs.writeFileSync("items-arr.js", output);

console.log("✅ items-arr.js generated!");
