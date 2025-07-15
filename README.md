# 📛 badge-generator

[![Latest Release](https://img.shields.io/github/v/release/ernanej/badge-generator)](https://github.com/ernanej/badge-generator/releases)
[![Stars](https://img.shields.io/github/stars/ernanej/badge-generator?style=social)](https://github.com/ernanej/badge-generator/stargazers)
[![Forks](https://img.shields.io/github/forks/ernanej/badge-generator?style=social)](https://github.com/ernanej/badge-generator/network/members)
![Coverage](badges/coverage.svg)

**badge-generator** is a GitHub Action that creates dynamic, customizable badges using [Shields.io](https://shields.io). Perfect for displaying code coverage, build status, quality metrics, or any custom label and value in your repository.

## 🚀 Quick Usage

Add the following step to your workflow file (e.g. `.github/workflows/ci.yml`):

```yaml
# Example
- name: Generate coverage badge
  uses: ernanej/badge-generator@main
  with:
    name: '98.7%'
    prefix: 'coverage'
    icon: 'jest'
    color: 'green'
    style: 'flat-square'
    path: 'badges/coverage.svg'
    branch: 'badge'
```

_👉 See more examples in [`examples/README.md`](examples/README.md)_

## 🔧 Inputs

| Input          | Required | Description                                              |
| -------------- | -------- | ---------------------------------------------------- |
| `prefix`       | ❌        | Left-hand label (e.g. `"coverage"`)                      |
| `icon`         | ❌        | Icon name (e.g. `jest`, `github`, `codecov`, etc.)       |
| `color`        | ❌        | Badge color (e.g. `green`, `#ffaa00`)                    |
| `style`        | ❌        | Badge style (`flat`, `flat-square`, `plastic`, etc.)     |
| `labelColor`   | ❌        | Background color for the label                           |
| `logoColor`    | ❌        | Color of the icon/logo                                   |
| `link`         | ❌        | URL(s) the badge should link to (comma-separated if two) |
| `cacheSeconds` | ❌        | Cache time (in seconds) for badge                        |
| `path`         | ✅        | Output file path for the SVG badge                       |
| `branch`       | ❌        | Output branch for the SVG badge                         |

## 🛠️ Local Development

```bash
npm install
npm run build
node local-test.js   # Test the action locally
```

## 🙏 Acknowledgements

This project uses the awesome [Shields.io](https://shields.io) service to generate dynamic badge images.
If you find it useful, consider supporting their open-source work.

## 📄 License

MIT © [Ernane Ferreira](https://github.com/ernanej)