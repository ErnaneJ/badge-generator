const core = require('@actions/core');
const github = require('@actions/github');

const mockBuildBadgeUrl = jest.fn(() => 'https://badge.url');
const mockDownloadBadge = jest.fn(() => Buffer.from('<svg>...</svg>'));
const mockSaveBadgeToFile = jest.fn(() => 'badges/coverage.svg');
const mockCommitAndPush = jest.fn();
const mockCommentCoverageOnPR = jest.fn();

jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  setFailed: jest.fn(),
}));

jest.mock('@actions/github', () => ({
  context: {
    ref: 'refs/heads/main',
    eventName: 'push',
    payload: {},
    repo: { owner: 'user', repo: 'repo' },
  },
  getOctokit: jest.fn(),
}));

jest.mock('../src/badge', () => ({
  buildBadgeUrl: jest.fn(() => 'https://badge.url'),
  downloadBadge: jest.fn(() => Buffer.from('<svg>...</svg>')),
}));

jest.mock('../src/file', () => ({
  saveBadgeToFile: jest.fn(() => 'badges/coverage.svg'),
}));

jest.mock('../src/git', () => ({
  commitAndPush: jest.fn(() => Promise.resolve()),
}));

jest.mock('../src/github', () => ({
  commentCoverageOnPR: jest.fn(),
}));

const { commentCoverageOnPR } = require('../src/github');
const { commitAndPush } = require('../src/git');
const run = require('../src/index');

describe('run()', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    core.getInput.mockImplementation((key) => {
      const values = {
        name: '95%',
        prefix: 'coverage',
        icon: 'jest',
        color: 'green',
        style: 'flat-square',
        path: 'badges/coverage.svg',
        labelColor: '',
        logoColor: '',
        link: '',
        cacheSeconds: '',
        badge_branch: 'badge-generator',
        main_branch: 'main',
        github_token: 'fake-token',
      };
      return values[key];
    });
  });

  it('should commit to badge branch if on main and not a PR', async () => {
    github.context.ref = 'refs/heads/main';
    github.context.eventName = 'push';

    await run();

    expect(core.info).toHaveBeenCalledWith('On main branch (main), generating badge...');
    expect(commitAndPush).toHaveBeenCalledWith('badges/coverage.svg', 'badge-generator');
    expect(commentCoverageOnPR).not.toHaveBeenCalled();
  });

  it('should comment if PR found for non-main branch', async () => {
    github.context.ref = 'refs/heads/feature-branch';
    github.context.eventName = 'push';

    const mockList = jest.fn().mockResolvedValue({
      data: [{ number: 42 }],
    });

    github.getOctokit.mockReturnValue({
      rest: { pulls: { list: mockList } },
    });

    await run();

    expect(core.info).toHaveBeenCalledWith(
      'Found open PR #42 for branch feature-branch. Commenting coverage...'
    );
    expect(commentCoverageOnPR).toHaveBeenCalledWith({
      token: 'fake-token',
      coverage: '95%',
      prNumber: 42,
    });
  });

  it('should skip comment if no open PR found for branch', async () => {
    github.context.ref = 'refs/heads/feature-branch';
    github.context.eventName = 'push';

    const mockList = jest.fn().mockResolvedValue({ data: [] });

    github.getOctokit.mockReturnValue({
      rest: { pulls: { list: mockList } },
    });

    await run();

    expect(core.info).toHaveBeenCalledWith(
      'No open PR found for branch feature-branch. Skipping comment.'
    );
    expect(commentCoverageOnPR).not.toHaveBeenCalled();
  });

  it('should skip if no token and not main', async () => {
    core.getInput.mockImplementation((key) => {
      const values = {
        name: '95%',
        badge_branch: 'badge-generator',
        main_branch: 'main',
        github_token: '',
        path: 'badges/coverage.svg',
        prefix: '',
        icon: '',
        color: '',
        style: '',
        labelColor: '',
        logoColor: '',
        link: '',
        cacheSeconds: '',
      };
      return values[key];
    });

    github.context.ref = 'refs/heads/other';
    github.context.eventName = 'push';

    await run();

    expect(core.info).toHaveBeenCalledWith(
      'Not on main branch and no PR context or token. Skipping.'
    );
    expect(commentCoverageOnPR).not.toHaveBeenCalled();
    expect(commitAndPush).not.toHaveBeenCalled();
  });

  it('should call core.setFailed on error', async () => {
    const { buildBadgeUrl } = require('../src/badge');
    buildBadgeUrl.mockImplementationOnce(() => {
      throw new Error('fail!');
    });

    await run();

    expect(core.setFailed).toHaveBeenCalledWith('fail!');
  });
});
