const simpleGit = require('simple-git');

/**
 * Commits and pushes a file to the current Git branch.
 *
 * @param {string} filePath - The path of the file to commit and push.
 * @returns {Promise<void>}
 */
async function commitAndPush(filePath) {
  const git = simpleGit();

  await git.add(filePath);

  await git.commit(`doc: update badge: ${filePath}`, undefined, {
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: 'github-actions',
      GIT_AUTHOR_EMAIL: 'github-actions@github.com',
      GIT_COMMITTER_NAME: 'github-actions',
      GIT_COMMITTER_EMAIL: 'github-actions@github.com',
    },
  });

  await git.push();
}

module.exports = { commitAndPush };
