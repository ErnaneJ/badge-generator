const simpleGit = require('simple-git');

// Mocks
const mockAdd = jest.fn();
const mockCommit = jest.fn();
const mockPush = jest.fn();
const mockAddConfig = jest.fn();
const mockBranchLocal = jest.fn();
const mockCheckout = jest.fn();
const mockCheckoutLocalBranch = jest.fn();
const mockRaw = jest.fn();

jest.mock('simple-git', () => {
  return jest.fn(() => ({
    add: mockAdd,
    commit: mockCommit,
    push: mockPush,
    addConfig: mockAddConfig,
    branchLocal: mockBranchLocal,
    checkout: mockCheckout,
    checkoutLocalBranch: mockCheckoutLocalBranch,
    raw: mockRaw,
  }));
});

const { commitAndPush } = require('../src/git');

describe('commitAndPush', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GITHUB_WORKSPACE = '/home/runner/workspace';
  });

  it('should call git add, commit, and push in order', async () => {
    const filePath = 'badges/test.svg';

    mockRaw.mockRejectedValueOnce().mockRejectedValueOnce(); // no previous config

    await expect(commitAndPush(filePath)).resolves.toBeUndefined();

    expect(mockAdd).toHaveBeenCalledWith(filePath);
    expect(mockCommit).toHaveBeenCalledWith(`doc: update badge ${filePath}`);
    expect(mockPush).toHaveBeenCalled();
  });

  it('restores previous git configs if they existed', async () => {
    const filePath = 'badges/test.svg';

    mockRaw
      .mockResolvedValueOnce('previous-user')
      .mockResolvedValueOnce('previous@email.com');

    mockBranchLocal.mockResolvedValueOnce({ all: ['main'] });

    await commitAndPush(filePath, 'main');

    expect(mockAddConfig).toHaveBeenCalledWith('user.name', 'previous-user');
    expect(mockAddConfig).toHaveBeenCalledWith('user.email', 'previous@email.com');
  });

  it('creates and checks out a new branch if not found', async () => {
    const filePath = 'badges/test.svg';

    mockRaw.mockRejectedValueOnce().mockRejectedValueOnce();
    mockBranchLocal.mockResolvedValueOnce({ all: ['dev'] }); // 'badge-generator' not present

    await commitAndPush(filePath, 'badge-generator');

    expect(mockCheckoutLocalBranch).toHaveBeenCalledWith('badge-generator');
    expect(mockPush).toHaveBeenCalledWith('origin', 'badge-generator', { '--force': null });
  });

  it('checks out existing branch if found', async () => {
    const filePath = 'badges/test.svg';

    mockRaw.mockRejectedValueOnce().mockRejectedValueOnce();
    mockBranchLocal.mockResolvedValueOnce({ all: ['badge-generator'] });

    await commitAndPush(filePath, 'badge-generator');

    expect(mockCheckout).toHaveBeenCalledWith('badge-generator');
    expect(mockPush).toHaveBeenCalledWith('origin', 'badge-generator', { '--force': null });
  });
});
