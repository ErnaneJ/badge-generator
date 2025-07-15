const core = require('@actions/core');
const github = require('@actions/github');

/**
 * Posts a code coverage comment to a pull request.
 *
 * @param {Object} options
 * @param {string} options.token - GitHub token
 * @param {string} options.coverage - Coverage percentage string (e.g. "98.5%")
 * @returns {Promise<void>}
 */
async function commentCoverageOnPR({ token, coverage }) {
  const context = github.context;

  if (context.eventName !== 'pull_request') {
    if(process.env.NODE_ENV != 'test') core.info('Not a pull request event. Skipping PR comment.');
    return;
  }

  const prNumber = context.payload.pull_request?.number;
  if (!prNumber) {
    if(process.env.NODE_ENV != 'test') core.warning('No pull request number found.');
    return;
  }

  const octokit = github.getOctokit(token);

  const body = `🛡️ **Code Coverage Result**

The latest CI run for this pull request reports a code coverage of \`${coverage}\`.`;

  if(process.env.NODE_ENV != 'test')  core.info(`Commenting on PR #${prNumber}...`);
  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: prNumber,
    body,
  });
}

module.exports = { commentCoverageOnPR };
