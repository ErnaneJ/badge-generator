const core = require('@actions/core');

const mockBuildBadgeUrl = jest.fn(() => 'https://badge-url');
const mockDownloadBadge = jest.fn(() => Buffer.from('svg-content'));
const mockSaveBadgeToFile = jest.fn(() => 'badges/coverage.svg');
const mockCommitAndPush = jest.fn();
const mockCommentCoverageOnPR = jest.fn();

jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  info: jest.fn(),
  setFailed: jest.fn(),
}));

jest.mock('@actions/github', () => ({
  context: {
    ref: 'refs/heads/main',
    eventName: 'push',
  },
}));

jest.mock('../src/badge', () => ({
  buildBadgeUrl: jest.fn((...args) => mockBuildBadgeUrl(...args)),
  downloadBadge: jest.fn(() => mockDownloadBadge()),
}));

jest.mock('../src/file', () => ({
  saveBadgeToFile: jest.fn(() => mockSaveBadgeToFile()),
}));

jest.mock('../src/git', () => ({
  commitAndPush: jest.fn((...args) => mockCommitAndPush(...args)),
}));

jest.mock('../src/github', () => ({
  commentCoverageOnPR: jest.fn((...args) => mockCommentCoverageOnPR(...args)),
}));

const run = require('../src/index');
const github = require('@actions/github');

describe('run', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    core.getInput.mockImplementation((key) => {
      const inputs = {
        name: '90%',
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
      return inputs[key];
    });
  });

  it('should generate badge and commit on main branch', async () => {
    github.context.ref = 'refs/heads/main';
    github.context.eventName = 'push';

    await run();

    expect(mockBuildBadgeUrl).toHaveBeenCalled();
    expect(mockDownloadBadge).toHaveBeenCalled();
    expect(mockSaveBadgeToFile).toHaveBeenCalled();
    expect(mockCommitAndPush).toHaveBeenCalledWith('badges/coverage.svg', 'badge-generator');
    expect(mockCommentCoverageOnPR).not.toHaveBeenCalled();
  });

  it('should comment on PR if not on main and is PR with token', async () => {
    github.context.ref = 'refs/heads/feature/test';
    github.context.eventName = 'pull_request';

    await run();

    expect(mockCommentCoverageOnPR).toHaveBeenCalledWith({
      token: 'fake-token',
      coverage: '90%',
    });

    expect(mockCommitAndPush).not.toHaveBeenCalled();
  });

  it('should skip if not on main and not a PR', async () => {
    github.context.ref = 'refs/heads/feature/test';
    github.context.eventName = 'push';

    await run();

    expect(core.info).toHaveBeenCalledWith('Not on main branch and not a PR. Skipping.');
    expect(mockCommitAndPush).not.toHaveBeenCalled();
    expect(mockCommentCoverageOnPR).not.toHaveBeenCalled();
  });

  it('should call setFailed on error', async () => {
    mockBuildBadgeUrl.mockImplementation(() => {
      throw new Error('boom');
    });

    await run();

    expect(core.setFailed).toHaveBeenCalledWith('boom');
  });
});
