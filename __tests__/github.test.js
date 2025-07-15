const core = require('@actions/core');
const github = require('@actions/github');

const mockCreateComment = jest.fn();

jest.mock('@actions/core', () => ({
  info: jest.fn(),
  warning: jest.fn(),
}));

jest.mock('@actions/github', () => ({
  context: {
    eventName: 'pull_request',
    payload: {
      pull_request: { number: 123 },
    },
    repo: {
      owner: 'user',
      repo: 'repo',
    },
  },
  getOctokit: jest.fn(() => ({
    rest: {
      issues: {
        createComment: mockCreateComment,
      },
    },
  })),
}));

const { commentCoverageOnPR } = require('../src/github');

describe('commentCoverageOnPR', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
    github.context.eventName = 'pull_request';
    github.context.payload.pull_request = { number: 123 };
  });

  it('should comment on pull request if prNumber is passed explicitly', async () => {
    await commentCoverageOnPR({
      token: 'fake-token',
      coverage: '88%',
      prNumber: 99,
    });

    expect(mockCreateComment).toHaveBeenCalledWith({
      owner: 'user',
      repo: 'repo',
      issue_number: 99,
      body: expect.stringContaining('88%'),
    });
  });

  it('should comment on PR using context if prNumber not provided', async () => {
    await commentCoverageOnPR({
      token: 'fake-token',
      coverage: '91%',
    });

    expect(mockCreateComment).toHaveBeenCalledWith({
      owner: 'user',
      repo: 'repo',
      issue_number: 123,
      body: expect.stringContaining('91%'),
    });
  });

  it('should skip if no PR number is found', async () => {
    github.context.payload.pull_request = undefined;

    await commentCoverageOnPR({
      token: 'fake-token',
      coverage: '75%',
    });

    expect(mockCreateComment).not.toHaveBeenCalled();
  });

  it('should log if NODE_ENV is not test', async () => {
    process.env.NODE_ENV = 'ci';

    await commentCoverageOnPR({
      token: 'fake-token',
      coverage: '92%',
    });

    expect(core.info).toHaveBeenCalledWith('Commenting on PR #123...');
    expect(mockCreateComment).toHaveBeenCalled();
  });

  it('should warn if PR number is missing and not in test env', async () => {
    github.context.payload.pull_request = undefined;
    process.env.NODE_ENV = 'ci';

    await commentCoverageOnPR({
      token: 'fake-token',
      coverage: '84%',
    });

    expect(core.warning).toHaveBeenCalledWith('No pull request number found.');
    expect(mockCreateComment).not.toHaveBeenCalled();
  });
});
