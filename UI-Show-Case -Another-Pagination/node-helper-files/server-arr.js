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
const items = thumbs.map((thumb) => {
  // Extract day number from filename (e.g., "D011-flsh.jpg" -> 11)
  const match = thumb.match(/^D(\d+)[-_]/i);
  const dayNumber = match ? parseInt(match[1], 10) : null;

  // Try to find matching folder in `shows` that starts with the same number
  const showFolder = shows.find((folder) => {
    const folderMatch = folder.match(/^(\d+)[-_]/);
    return folderMatch && parseInt(folderMatch[1], 10) === dayNumber;
  });

  if (!showFolder) {
    console.warn(`⚠️ No matching show folder found for ${thumb}`);
  }

  // Extract title from the corresponding index.html file
  const indexPath = showFolder
    ? path.join(showsDir, showFolder, "index.html")
    : null;
  const title = indexPath ? extractTitle(indexPath) : null;

  const displayText = `Day ${dayNumber} ${title || ""}`.trim();

  const altText = path
    .basename(thumb, path.extname(thumb))
    .replace(/[-_]/g, " ");

  return {
    image: `./thumbs/${thumb}`,
    alt: altText,
    text: displayText,
    href: showFolder ? `./shows/${showFolder}/index.html` : "#", // fallback to '#' if not found
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
