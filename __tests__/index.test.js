jest.mock('@actions/core');
jest.mock('../src/badge');
jest.mock('../src/file');
jest.mock('../src/git');

const core = require('@actions/core');
const { buildBadgeUrl, downloadBadge } = require('../src/badge');
const { saveBadgeToFile } = require('../src/file');
const { commitAndPush } = require('../src/git');

const run = require('../src/index');

describe('run integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    core.getInput.mockImplementation((key) => {
      const inputs = {
        name: '90%',
        prefix: 'coverage',
        icon: 'jest',
        color: 'blue',
        style: 'flat',
        path: 'badges/test.svg',
        labelColor: '',
        logoColor: '',
        link: '',
        cacheSeconds: ''
      };
      return inputs[key];
    });

    buildBadgeUrl.mockReturnValue('https://fake.url/badge.svg');
    downloadBadge.mockResolvedValue(Buffer.from('svg-content'));
    saveBadgeToFile.mockReturnValue('badges/test.svg');
  });

  it('should run all steps successfully', async () => {
    await run();
    expect(buildBadgeUrl).toHaveBeenCalled();
    expect(downloadBadge).toHaveBeenCalled();
    expect(saveBadgeToFile).toHaveBeenCalled();
    expect(commitAndPush).toHaveBeenCalled();
  });

  it('should call core.setFailed on error', async () => {
    const error = new Error('mock failure');
    buildBadgeUrl.mockImplementationOnce(() => {
      throw error;
    });

    await run();

    expect(core.setFailed).toHaveBeenCalledWith('mock failure');
  });
});
