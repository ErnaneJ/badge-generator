const core = require('@actions/core');

// Mocks que vamos rastrear
const mockCreateComment = jest.fn();
const mockGetOctokit = jest.fn().mockReturnValue({
  rest: {
    issues: {
      createComment: mockCreateComment,
    },
  },
});

// mock da lib do GitHub Actions
jest.mock('@actions/github', () => ({
  context: {
    eventName: 'pull_request',
    payload: {
      pull_request: { number: 42 },
    },
    repo: {
      owner: 'user',
      repo: 'repo',
    },
  },
  getOctokit: mockGetOctokit,
}));

jest.mock('@actions/core', () => ({
  info: jest.fn(),
  warning: jest.fn(),
}));

const github = require('@actions/github');
const { commentCoverageOnPR } = require('../src/github');

describe('commentCoverageOnPR', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
  });

  it('should skip if event is not pull_request', async () => {
    github.context.eventName = 'push';

    await commentCoverageOnPR({ token: 'fake-token', coverage: '88%' });

    expect(core.info).not.toHaveBeenCalled(); // porque está em test
    expect(mockCreateComment).not.toHaveBeenCalled();
  });

  it('should log and skip if event is not pull_request (outside test env)', async () => {
    process.env.NODE_ENV = 'ci';
    github.context.eventName = 'push';

    await commentCoverageOnPR({ token: 'fake-token', coverage: '88%' });

    expect(core.info).toHaveBeenCalledWith('Not a pull request event. Skipping PR comment.');
    expect(mockCreateComment).not.toHaveBeenCalled();
  });

  it('should skip if pull request number is missing', async () => {
    github.context.eventName = 'pull_request';
    github.context.payload.pull_request = undefined;

    await commentCoverageOnPR({ token: 'fake-token', coverage: '88%' });

    expect(core.warning).not.toHaveBeenCalled(); // test env
    expect(mockCreateComment).not.toHaveBeenCalled();
  });

  it('should log and skip if pull request number is missing (outside test env)', async () => {
    process.env.NODE_ENV = 'ci';
    github.context.payload.pull_request = undefined;

    await commentCoverageOnPR({ token: 'fake-token', coverage: '88%' });

    expect(core.warning).toHaveBeenCalledWith('No pull request number found.');
    expect(mockCreateComment).not.toHaveBeenCalled();
  });

  it('should comment on PR with correct content', async () => {
    github.context.payload.pull_request = { number: 42 };

    await commentCoverageOnPR({ token: 'fake-token', coverage: '88%' });

    expect(mockCreateComment).toHaveBeenCalledWith({
      owner: 'user',
      repo: 'repo',
      issue_number: 42,
      body: expect.stringContaining('88%'),
    });
  });

  it('should comment and log when not in test env', async () => {
    process.env.NODE_ENV = 'ci';
    github.context.payload.pull_request = { number: 42 };

    await commentCoverageOnPR({ token: 'fake-token', coverage: '95.5%' });

    expect(core.info).toHaveBeenCalledWith('Commenting on PR #42...');
    expect(mockCreateComment).toHaveBeenCalledWith({
      owner: 'user',
      repo: 'repo',
      issue_number: 42,
      body: expect.stringContaining('95.5%'),
    });
  });
});
