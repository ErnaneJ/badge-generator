global.console.info = jest.fn();
global.console.warn = jest.fn();
global.console.log = jest.fn();
global.console.error = jest.fn();

try {
  const core = require('@actions/core');
  core.info = jest.fn();
  core.warning = jest.fn();
  core.setFailed = jest.fn();
} catch (err) {
  // @actions/core may be mocked differently in some tests
}
