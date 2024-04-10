import fs from "fs";
import sharp from "sharp";

// Input and output directories
const inputDir = "./input";
const outputDir = "./output";

// Read input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error reading input directory:", err);
    return;
  }

  // Filter JPEG files
  const jpegFiles = files.filter(
    (file) => file.endsWith(".jpg") || file.endsWith(".jpeg")
  );

  // Process each JPEG file
  jpegFiles.forEach((file) => {
    // Input file path
    const inputFilePath = `${inputDir}/${file}`;

    // Output file path (replace .jpg/.jpeg with .webp)
    const outputFilePath = `${outputDir}/${file.replace(
      /\.(jpg|jpeg)$/i,
      ".webp"
    )}`;

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Convert JPEG to WebP
    sharp(inputFilePath)
      // .resize(800)
      .webp()
      .toFile(outputFilePath, (err, info) => {
        if (err) {
          console.error(`Error converting ${inputFilePath}:`, err);
        } else {
          console.log(`Converted ${inputFilePath} to ${outputFilePath}`);
        }
      });
  });
});
