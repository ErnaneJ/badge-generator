# 📛 badge-generator

[![Latest Release](https://img.shields.io/github/v/release/ernanej/badge-generator)](https://github.com/ernanej/badge-generator/releases)
[![Stars](https://img.shields.io/github/stars/ernanej/badge-generator?style=social)](https://github.com/ernanej/badge-generator/stargazers)
[![Forks](https://img.shields.io/github/forks/ernanej/badge-generator?style=social)](https://github.com/ernanej/badge-generator/network/members)
![Coverage](badges/coverage.svg)

**badge-generator** is a GitHub Action that creates dynamic, customizable badges using [Shields.io](https://shields.io). It's perfect for displaying code coverage, build status, code quality, and other metrics directly in your repository.

## 🚀 Usage

Add this to your workflow file (e.g. `.github/workflows/ci.yml`):

```yaml
- name: Generate coverage badge
  uses: ernanej/badge-generator@version
  with:
    name: '98.7%'
    prefix: 'coverage'
    icon: 'jest'
    color: 'green'
    style: 'flat-square'
    path: 'badges/coverage.svg'
```

## 🔧 Inputs

| Input          | Required | Description                                          |
| -------------- | -------- | ---------------------------------------------------- |
| `name`         | ✅        | Right-hand text (e.g. "98.7%")                       |
| `prefix`       | ❌        | Left-hand label (e.g. "coverage")                    |
| `icon`         | ❌        | Logo icon (Shields.io supported)                     |
| `color`        | ❌        | Badge color (e.g. `green`, `#ffaa00`)                |
| `style`        | ❌        | Badge style (`flat`, `flat-square`, `plastic`, etc.) |
| `labelColor`   | ❌        | Background color for the label                       |
| `logoColor`    | ❌        | Color of the logo/icon                               |
| `link`         | ❌        | Hyperlink(s) (comma-separated for dual link support) |
| `cacheSeconds` | ❌        | Cache duration in seconds                            |
| `path`         | ✅        | Output file path (e.g. `badges/coverage.svg`)        |

## 🧪 Testing & Coverage

* 100% unit test coverage
* Powered by [Jest](https://jestjs.io/)
* Automatically runs tests and generates coverage badge on every push to `main`

## 🛠️ Local Development

```bash
npm install
npm run build
node local-test.js # Test the action locally
```

## ⚙️ Automatic Build & Badge Commit

When you push to the `main` branch:

* Tests and coverage are executed
* The badge is generated using the latest coverage data
* A production-ready build (`dist/`) is generated via `ncc`
* The coverage badge is committed to the repository automatically

## 📦 Distribution

This action uses [`@vercel/ncc`](https://github.com/vercel/ncc) to bundle dependencies into a single file inside `dist/`, so it’s ready for production use with GitHub Actions.

## 🙏 Acknowledgements

This project uses the awesome [Shields.io](https://shields.io) service to generate dynamic badge images.  
If you find it useful, consider supporting their open source work.

## 📄 License

MIT © Ernane Ferreira
