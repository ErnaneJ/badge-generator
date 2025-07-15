const simpleGit = require('simple-git');

/**
 * Commits and pushes a file to a specified Git branch.
 *
 * @param {string} filePath - The path of the file to commit and push.
 * @param {string} [branch] - Optional branch name to push to.
 * @returns {Promise<void>}
 */
async function commitAndPush(filePath, branch) {
  const git = simpleGit();
  const workspace = process.env.GITHUB_WORKSPACE;

  // Backup existing config
  const originalName = await git.raw(['config', '--get', 'user.name']).catch(() => null);
  const originalEmail = await git.raw(['config', '--get', 'user.email']).catch(() => null);

  try {
    await git.addConfig('user.name', 'github-actions');
    await git.addConfig('user.email', 'github-actions@github.com');
    await git.addConfig('safe.directory', workspace);

    await git.add(filePath);
    await git.commit(`doc: update badge ${filePath}`);

    if (branch) {
      const branches = await git.branchLocal();
      if (!branches.all.includes(branch)) {
        await git.checkoutLocalBranch(branch);
      } else {
        await git.checkout(branch);
      }

      await git.push('origin', branch, { '--force': null });
    } else {
      await git.push();
    }
  } finally {
    // Restore original config if it existed
    if (originalName) await git.addConfig('user.name', originalName.trim());
    if (originalEmail) await git.addConfig('user.email', originalEmail.trim());
  }
}

module.exports = { commitAndPush };
