const fs = require('fs');
const path = require('path');

/**
 * Saves a badge image buffer to a specified file path.
 * Automatically creates directories if they do not exist.
 *
 * @param {Buffer} buffer - The badge image buffer (typically SVG content).
 * @param {string} outputPath - The desired file path for the saved badge.
 * @returns {string} The absolute path to the saved file.
 */
function saveBadgeToFile(buffer, outputPath) {
  const fullPath = path.resolve(outputPath);

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, buffer);

  return fullPath;
}

module.exports = { saveBadgeToFile };
