const core = require('@actions/core');
const github = require('@actions/github');
const { buildBadgeUrl, downloadBadge } = require('./badge');
const { saveBadgeToFile } = require('./file');
const { commitAndPush } = require('./git');
const { commentCoverageOnPR } = require('./github');

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
      cacheSeconds: core.getInput('cacheSeconds'),
      badgeBranch: core.getInput('badge_branch') || 'badge-generator',
      mainBranch: core.getInput('main_branch') || 'main',
      githubToken: core.getInput('github_token'),
    };

    const currentBranch = github.context.ref.replace('refs/heads/', '');
    const isPR = github.context.eventName === 'pull_request';

    const badgeUrl = buildBadgeUrl(inputs);
    const badgeBuffer = await downloadBadge(badgeUrl);
    const savedPath = saveBadgeToFile(badgeBuffer, inputs.path);

    if (currentBranch === inputs.mainBranch) {
      core.info(`On main branch (${inputs.mainBranch}), generating badge...`);
      await commitAndPush(savedPath, inputs.badgeBranch);
    } else if (isPR && inputs.githubToken) {
      core.info('On PR branch, commenting coverage...');
      await commentCoverageOnPR({
        token: inputs.githubToken,
        coverage: inputs.name,
      });
    } else {
      core.info('Not on main branch and not a PR. Skipping.');
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = run;
