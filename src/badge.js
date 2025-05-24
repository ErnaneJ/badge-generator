/**
 * Builds a Shields.io badge URL using the provided customization options.
 *
 * @param {Object} options - Badge configuration options.
 * @param {string} options.name - Text displayed on the right side of the badge.
 * @param {string} options.prefix - Label displayed on the left side of the badge.
 * @param {string} [options.icon] - Optional logo icon name supported by Shields.io.
 * @param {string} options.color - Background color of the badge.
 * @param {string} options.style - Badge style (e.g. flat, flat-square, for-the-badge).
 * @param {string} [options.labelColor] - Optional label background color.
 * @param {string} [options.logoColor] - Optional logo color.
 * @param {string} [options.link] - Optional hyperlink or comma-separated links.
 * @param {string} [options.cacheSeconds] - Optional cache duration in seconds.
 * @returns {string} A fully constructed Shields.io badge URL.
 */
function buildBadgeUrl({ name, prefix, icon, color, style, labelColor, logoColor, link, cacheSeconds }) {
  const label = encodeURIComponent(prefix);
  const message = encodeURIComponent(name);
  const badgeColor = encodeURIComponent(color);

  const params = [`style=${encodeURIComponent(style)}`];

  if (icon) params.push(`logo=${encodeURIComponent(icon)}`);
  if (logoColor) params.push(`logoColor=${encodeURIComponent(logoColor)}`);
  if (labelColor) params.push(`labelColor=${encodeURIComponent(labelColor)}`);
  if (link) params.push(`link=${encodeURIComponent(link)}`);
  if (cacheSeconds) params.push(`cacheSeconds=${encodeURIComponent(cacheSeconds)}`);

  const query = params.join('&');
  return `https://img.shields.io/badge/${label}-${message}-${badgeColor}.svg?${query}`;
}

/**
 * Downloads a badge image from a given Shields.io URL.
 *
 * @param {string} url - The full Shields.io badge URL.
 * @returns {Promise<Buffer>} A promise that resolves to the badge image as a Buffer.
 * @throws Will throw an error if the HTTP request fails.
 */
async function downloadBadge(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download badge: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

module.exports = { buildBadgeUrl, downloadBadge };
