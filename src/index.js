const core = require('@actions/core');
const { buildBadgeUrl, downloadBadge } = require('./badge');
const { saveBadgeToFile } = require('./file');
const { commitAndPush } = require('./git');

/**
 * Main execution function for the GitHub Action.
 * 
 * Retrieves inputs, builds the badge URL, downloads the image,
 * saves it to the specified path, and commits the result to the repository.
 *
 * Automatically fails the action if any step throws an error.
 *
 * @returns {Promise<void>}
 */
async function run() {
  try {
    const inputs = {
      name: core.getInput('name'),
      prefix: core.getInput('prefix'),
      icon: core.getInput('icon'),
      color: core.getInput('color'),
      style: core.getInput('style'),
      path: core.getInput('path'),
      labelColor: core.getInput('labelColor'),
      logoColor: core.getInput('logoColor'),
      link: core.getInput('link'),
      cacheSeconds: core.getInput('cacheSeconds')
    };

    const badgeUrl = buildBadgeUrl(inputs);
    const badgeBuffer = await downloadBadge(badgeUrl);
    const savedPath = saveBadgeToFile(badgeBuffer, inputs.path);
    await commitAndPush(savedPath);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = run;
