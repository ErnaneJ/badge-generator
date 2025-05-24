jest.mock('simple-git', () => () => ({
  add: jest.fn().mockResolvedValue(true),
  commit: jest.fn().mockResolvedValue(true),
  push: jest.fn().mockResolvedValue(true),
}));

const { commitAndPush } = require('../src/git');

describe('commitAndPush', () => {
  it('should call git add, commit, and push', async () => {
    await expect(commitAndPush('badges/test.svg')).resolves.toBeUndefined();
  });
});
