const mockAdd = jest.fn().mockResolvedValue(true);
const mockCommit = jest.fn().mockResolvedValue(true);
const mockPush = jest.fn().mockResolvedValue(true);

jest.mock('simple-git', () => () => ({
  add: mockAdd,
  commit: mockCommit,
  push: mockPush,
}));

const { commitAndPush } = require('../src/git');

describe('commitAndPush', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call git add, commit, and push in order', async () => {
    const filePath = 'badges/test.svg';

    await expect(commitAndPush(filePath)).resolves.toBeUndefined();

    expect(mockAdd).toHaveBeenCalledWith(filePath);
    expect(mockCommit).toHaveBeenCalledWith(`doc: update badge ${filePath}`);
    expect(mockPush).toHaveBeenCalled();
  });
});
