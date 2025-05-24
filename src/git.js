const simpleGit = require('simple-git');
const { execSync } = require('child_process');

/**
 * Commits and pushes a file to the current Git branch.
 *
 * @param {string} filePath - The path of the file to commit and push.
 * @returns {Promise<void>}
 */
async function commitAndPush(filePath) {
  try {
    // Set author identity globally
    execSync('git config --global user.name "github-actions"');
    execSync('git config --global user.email "github-actions@github.com"');
  } catch (e) {
    console.warn('⚠️ Failed to configure git user. This may cause commit issues in CI.');
  }

  const git = simpleGit();

  try {
    await git.add(filePath);
    await git.commit(`Update badge: ${filePath}`);
    await git.push();
  } catch (error) {
    throw new Error(`Git operation failed: ${error.message}`);
  }
}

module.exports = { commitAndPush };
