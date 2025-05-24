# 📘 — Badge Generator Usage Examples

This file showcases different use cases for the `badge-generator` GitHub Action, using [Shields.io](https://shields.io) to create custom SVG badges.

> For more examples, icons and customization check out the shields documentation at https://shields.io/docs and various action attributes.

## ✅ 1. Basic coverage badge

![Coverage](https://img.shields.io/badge/coverage-98.7%25-green)

```yaml
- name: Generate badge
  uses: ernanej/badge-generator@main
  with:
    name: '98.7%'
    prefix: 'coverage'
    color: 'green'
    path: 'badges/coverage.svg'
```

## 🎨 2. Flat-square style with icon

![Tests](https://img.shields.io/badge/tests-95.2%25-blue?style=flat-square\&logo=jest)

```yaml
- name: Coverage with style and icon
  uses: ernanej/badge-generator@main
  with:
    name: '95.2%'
    prefix: 'tests'
    icon: 'jest'
    color: 'blue'
    style: 'flat-square'
    path: 'badges/tests.svg'
```

## 🔗 3. Badge with hyperlink

[![Build](https://img.shields.io/badge/build-PASSING-brightgreen)](https://github.com/ernanej/badge-generator/actions)

```yaml
- name: Badge with link
  uses: ernanej/badge-generator@main
  with:
    name: 'PASSING'
    prefix: 'build'
    color: 'brightgreen'
    link: 'https://github.com/ernanej/badge-generator/actions'
    path: 'badges/build.svg'
```

## 🏷️ 4. Custom label color

![Quality](https://img.shields.io/badge/quality-90%25-orange?labelColor=333)

```yaml
- name: Custom label color
  uses: ernanej/badge-generator@main
  with:
    name: '90%'
    prefix: 'quality'
    color: 'orange'
    labelColor: '#333'
    path: 'badges/quality.svg'
```

## 🧪 5. Custom icon with logo color

![Tests](https://img.shields.io/badge/tests-100%25-purple?logo=mocha\&logoColor=red)

```yaml
- name: Icon with logo color
  uses: ernanej/badge-generator@main
  with:
    name: '100%'
    prefix: 'tests'
    icon: 'mocha'
    logoColor: 'red'
    color: 'purple'
    path: 'badges/mocha-tests.svg'
```

## 🕓 6. Cached badge

![Release](https://img.shields.io/badge/release-stable-blue?cacheSeconds=3600)

```yaml
- name: Cached badge
  uses: ernanej/badge-generator@main
  with:
    name: 'stable'
    prefix: 'release'
    color: 'blue'
    cacheSeconds: '3600'
    path: 'badges/release.svg'
```

## 📦 7. Version badge

![Version](https://img.shields.io/badge/version-v1.3.0-informational?style=plastic)

```yaml
- name: Version badge
  uses: ernanej/badge-generator@main
  with:
    name: 'v1.3.0'
    prefix: 'version'
    color: 'informational'
    style: 'plastic'
    path: 'badges/version.svg'
```

## 💡 8. Badge with hex color

![Coverage](https://img.shields.io/badge/coverage-98%25-ff5733)

```yaml
- name: Hex color badge
  uses: ernanej/badge-generator@main
  with:
    name: '98%'
    prefix: 'coverage'
    color: '#ff5733'
    path: 'badges/hex-coverage.svg'
```

## 🧩 9. Multi-link badge

[![Issues](https://img.shields.io/badge/issues-open-red)](https://github.com/ernanej/badge-generator/issues)

```yaml
- name: Multi-link badge
  uses: ernanej/badge-generator@main
  with:
    name: 'open'
    prefix: 'issues'
    color: 'red'
    link: 'https://github.com/ernanej/badge-generator/issues,https://shields.io'
    path: 'badges/issues.svg'
```

## 🛠️ 10. Minimalistic badge

![Status](https://img.shields.io/badge/status-ok-green)

```yaml
- name: Minimal badge
  uses: ernanej/badge-generator@main
  with:
    name: 'ok'
    prefix: 'status'
    color: 'green'
    path: 'badges/status.svg'
```

## 📘 11. For-the-badge style

![Docs](https://img.shields.io/badge/docs-available-blue?style=for-the-badge)

```yaml
- name: For-the-badge style
  uses: ernanej/badge-generator@main
  with:
    name: 'available'
    prefix: 'docs'
    color: 'blue'
    style: 'for-the-badge'
    path: 'badges/docs.svg'
```

## 🧰 12. Social-style badge

![Follow](https://img.shields.io/badge/follow-@ernanej-1DA1F2?style=social\&logo=twitter)

```yaml
- name: Social-style badge
  uses: ernanej/badge-generator@main
  with:
    name: '@ernanej'
    prefix: 'follow'
    icon: 'twitter'
    color: '1DA1F2'
    style: 'social'
    path: 'badges/twitter.svg'
```

## 🔒 13. License badge

![License](https://img.shields.io/badge/license-MIT-blue)

```yaml
- name: License badge
  uses: ernanej/badge-generator@main
  with:
    name: 'MIT'
    prefix: 'license'
    color: 'blue'
    path: 'badges/license.svg'
```

## 🚀 14. Build badge

![Build](https://img.shields.io/badge/build-passing-brightgreen)

```yaml
- name: Build badge
  uses: ernanej/badge-generator@main
  with:
    name: 'passing'
    prefix: 'build'
    color: 'brightgreen'
    path: 'badges/build-status.svg'
```

## 🧪 15. Test badge

![Tests](https://img.shields.io/badge/tests-100%25-success)

```yaml
- name: Test badge
  uses: ernanej/badge-generator@main
  with:
    name: '100%'
    prefix: 'tests'
    color: 'success'
    path: 'badges/tests.svg'
```

## 📈 16. Code coverage badge

![Coverage](https://img.shields.io/badge/coverage-85%25-yellowgreen)

```yaml
- name: Code coverage badge
  uses: ernanej/badge-generator@main
  with:
    name: '85%'
    prefix: 'coverage'
    color: 'yellowgreen'
    path: 'badges/coverage.svg'
```

## 📉 17. Performance badge

![Performance](https://img.shields.io/badge/performance-96%25-success)

```yaml
- name: Performance badge
  uses: ernanej/badge-generator@main
  with:
    name: '96%'
    prefix: 'performance'
    color: 'success'
    path: 'badges/performance.svg'
```

## 💬 18. Documentation status badge

![Docs](https://img.shields.io/badge/docs-complete-blue)

```yaml
- name: Documentation badge
  uses: ernanej/badge-generator@main
  with:
    name: 'complete'
    prefix: 'docs'
    color: 'blue'
    path: 'badges/docs-complete.svg'
```

## 🎯 19. Status badge with emoji (encoded)

![Status](https://img.shields.io/badge/status-%F0%9F%9A%80%20ready-brightgreen)

```yaml
- name: Emoji badge
  uses: ernanej/badge-generator@main
  with:
    name: '🚀 ready'
    prefix: 'status'
    color: 'brightgreen'
    path: 'badges/emoji-status.svg'
```

## 🛡️ 20. Security status badge

![Security](https://img.shields.io/badge/security-verified-success)

```yaml
- name: Security badge
  uses: ernanej/badge-generator@main
  with:
    name: 'verified'
    prefix: 'security'
    color: 'success'
    path: 'badges/security.svg'
```