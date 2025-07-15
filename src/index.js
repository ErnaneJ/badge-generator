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

    const isPR = github.context.eventName === 'pull_request';
    const currentBranch = isPR
      ? github.context.payload.pull_request.head.ref
      : github.context.ref.replace('refs/heads/', '');

    const badgeUrl = buildBadgeUrl(inputs);
    const badgeBuffer = await downloadBadge(badgeUrl);
    const savedPath = saveBadgeToFile(badgeBuffer, inputs.path);

    if (currentBranch === inputs.mainBranch && !isPR) {
      core.info(`On main branch (${inputs.mainBranch}), generating badge...`);
      await commitAndPush(savedPath, inputs.badgeBranch);
    } else if (inputs.githubToken) {
      const octokit = github.getOctokit(inputs.githubToken);
      const { owner, repo } = github.context.repo;

      // Tenta encontrar PR associado à branch
      const { data: pullRequests } = await octokit.rest.pulls.list({
        owner,
        repo,
        head: `${owner}:${currentBranch}`,
        state: 'open',
      });

      if (pullRequests.length > 0) {
        const prNumber = pullRequests[0].number;
        core.info(`Found open PR #${prNumber} for branch ${currentBranch}. Commenting coverage...`);
        await commentCoverageOnPR({
          token: inputs.githubToken,
          coverage: inputs.name,
          prNumber,
        });
      } else {
        core.info(`No open PR found for branch ${currentBranch}. Skipping comment.`);
      }
    } else {
      core.info('Not on main branch and no PR context or token. Skipping.');
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = run;
