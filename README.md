# 📛 badge-generator

[![Latest Release](https://img.shields.io/github/v/release/ernanej/badge-generator)](https://github.com/ernanej/badge-generator/releases)
[![Stars](https://img.shields.io/github/stars/ernanej/badge-generator?style=social)](https://github.com/ernanej/badge-generator/stargazers)
[![Forks](https://img.shields.io/github/forks/ernanej/badge-generator?style=social)](https://github.com/ernanej/badge-generator/network/members)
![Coverage](https://github.com/ErnaneJ/badge-generator/blob/badge-generator/badges/coverage.svg)

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

| Input          | Required | Description                                                            |
| -------------- | -------- | ---------------------------------------------------------------------- |
| `name`         | ✅        | Right-hand side value (e.g. `"98.7%"`)                                 |
| `prefix`       | ❌        | Left-hand label (e.g. `"coverage"`)                                    |
| `icon`         | ❌        | Icon name (e.g. `jest`, `github`, `codecov`, etc.)                     |
| `color`        | ❌        | Badge color (e.g. `green`, `#ffaa00`)                                  |
| `style`        | ❌        | Badge style (`flat`, `flat-square`, `plastic`, etc.)                   |
| `labelColor`   | ❌        | Label background color                                                 |
| `logoColor`    | ❌        | Icon/logo color                                                        |
| `link`         | ❌        | URL or comma-separated URLs the badge should link to                   |
| `cacheSeconds` | ❌        | Cache duration (seconds) for badge                                     |
| `path`         | ✅        | Local file path where badge will be saved (e.g. `badges/coverage.svg`) |
| `badge_branch` | ❌        | Branch where the badge will be committed (default: `badge-generator`)  |
| `main_branch`  | ❌        | The main branch name (default: `main`)                                 |
| `github_token` | ❌        | GitHub token (required for PR comments)                                |

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