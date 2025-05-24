const simpleGit = require('simple-git');

/**
 * Commits and pushes a file to the current Git branch.
 * Typically used to update a generated badge or build output.
 *
 * @param {string} filePath - The path of the file to commit and push.
 * @returns {Promise<void>} Resolves when the operation is complete.
 */
async function commitAndPush(filePath) {
  const git = simpleGit();

  await git.addConfig('user.name', 'github-actions');
  await git.addConfig('user.email', 'github-actions@github.com');

  await git.add(filePath);
  await git.commit(`doc: update badge ${filePath}`);
  await git.push();
}

module.exports = { commitAndPush };
