const simpleGit = require('simple-git');
const { execSync } = require('child_process');

/**
 * Commits and pushes a file to the current Git branch.
 *
 * @param {string} filePath - The path of the file to commit and push.
 * @returns {Promise<void>}
 */
async function commitAndPush(filePath) {
  // Set author identity
  execSync('git config --global user.name "github-actions"');
  execSync('git config --global user.email "github-actions@github.com"');

  const git = simpleGit();
  await git.add(filePath);
  await git.commit(`Update badge: ${filePath}`);
  await git.push();
}

module.exports = { commitAndPush };
