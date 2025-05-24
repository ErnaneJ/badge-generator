const fs = require('fs');
const path = require('path');
const { saveBadgeToFile } = require('../src/file');

describe('saveBadgeToFile', () => {
  const testPath = 'badges/test-output.svg';
  const testBuffer = Buffer.from('<svg>Test</svg>', 'utf-8');

  afterEach(() => {
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath);
    }
  });

  it('should write buffer to file system', () => {
    const savedPath = saveBadgeToFile(testBuffer, testPath);
    expect(fs.existsSync(savedPath)).toBe(true);

    const content = fs.readFileSync(savedPath, 'utf-8');
    expect(content).toContain('<svg>Test</svg>');
  });
});
