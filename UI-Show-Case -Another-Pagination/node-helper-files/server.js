const fs = require("fs");
const path = require("path");

// const folderPath = path.join(__dirname, "thumbs");
// const images = fs.readdirSync(folderPath).filter((file) => {
//   return /\.(jpe?g|png|gif|webp)$/i.test(file);
// });
// console.log(images);
// const imageArray = `const images=${JSON.stringify(images, null, 2)}`;
// fs.writeFileSync(path.join(__dirname, "thumb-arr.js"), imageArray, "utf8");

// Directories
const thumbsDir = path.join(__dirname, "thumbs");
const showsDir = path.join(__dirname, "shows");

// Read thumbs (filtering by common image extensions)
const thumbs = fs
  .readdirSync(thumbsDir)
  .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
  .sort(); // Sort to keep order consistent

// Read shows (filtering only folders)
const shows = fs
  .readdirSync(showsDir)
  .filter((dir) => fs.statSync(path.join(showsDir, dir)).isDirectory())
  .sort(); // Sort to keep order consistent

// Ensure same length
if (thumbs.length !== shows.length) {
  console.error(
    `❌ Mismatch between thumbs (${thumbs.length}) and shows (${shows.length})!`
  );
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

// Generate JS content with correct trailing commas
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
