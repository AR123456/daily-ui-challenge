const fs = require("fs");
const path = require("path");

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

// Validate  same length
if (thumbs.length !== shows.length) {
  console.error(
    `❌ Mismatch between thumbs (${thumbs.length}) and shows (${shows.length})!`
  );
  process.exit(1);
}
// Helper function to extract <title> from HTML file
function extractTitle(filePath) {
  try {
    const htmlContent = fs.readFileSync(filePath, "utf-8");
    const match = htmlContent.match(/<title>(.*?)<\/title>/i);
    return match ? match[1].trim() : null;
  } catch (error) {
    console.warn(`⚠️ Could not read ${filePath}:`, error.message);
    return null;
  }
}

// Build items array
const items = thumbs.map((thumb, index) => {
  const showFolder = shows[index];
  const indexPath = path.join(showsDir, showFolder, "index.html");
  const title = extractTitle(indexPath);

  // Fallback if no title found
  const displayText = `Day ${index + 1} ${title || ""}`.trim();

  // Generate alt text by removing extension and replacing dashes/underscores with spaces
  const altText = path
    .basename(thumb, path.extname(thumb))
    .replace(/[-_]/g, " ");

  return {
    image: `./thumbs/${thumb}`,
    alt: altText,
    text: displayText,
    href: `./shows/${showFolder}/index.html`,
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
