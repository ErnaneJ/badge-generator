const { downloadBadge } = require('../src/badge');
const { buildBadgeUrl } = require('../src/badge');

global.fetch = jest.fn();

describe('buildBadgeUrl', () => {
  it('should build URL with required fields', () => {
    const url = buildBadgeUrl({
      name: '98%',
      prefix: 'coverage',
      icon: '',
      color: 'green',
      style: 'flat',
      labelColor: '',
      logoColor: '',
      link: '',
      cacheSeconds: ''
    });

    expect(url).toBe(
      'https://img.shields.io/badge/coverage-98%25-green.svg?style=flat'
    );
  });

  it('should include optional parameters in the URL', () => {
    const url = buildBadgeUrl({
      name: '95%',
      prefix: 'quality',
      icon: 'jest',
      color: 'blue',
      style: 'for-the-badge',
      labelColor: 'gray',
      logoColor: 'white',
      link: 'https://example.com',
      cacheSeconds: '300'
    });

    expect(url).toContain('style=for-the-badge');
    expect(url).toContain('logo=jest');
    expect(url).toContain('logoColor=white');
    expect(url).toContain('labelColor=gray');
    expect(url).toContain('link=https%3A%2F%2Fexample.com');
    expect(url).toContain('cacheSeconds=300');
  });

  it('should download and return buffer if response is ok', async () => {
    const svg = '<svg>mock</svg>';
    const buffer = Buffer.from(svg, 'utf-8');
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

    fetch.mockResolvedValueOnce({
      ok: true,
      arrayBuffer: async () => arrayBuffer
    });

    const result = await downloadBadge('https://example.com/badge.svg');
    expect(result.equals(buffer)).toBe(true);
  });

  it('should throw error if fetch fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found'
    });

    await expect(downloadBadge('https://example.com/fail.svg')).rejects.toThrow('Failed to download badge: Not Found');
  });
});
