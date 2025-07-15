/**
 * Sets up environment variables to simulate GitHub Action inputs locally.
 * Modify these values to test different badge configurations.
 */
function setMockInputs() {
  process.env['INPUT_NAME'] = '98.7%';
  process.env['INPUT_PREFIX'] = 'coverage';
  process.env['INPUT_ICON'] = 'jest';
  process.env['INPUT_COLOR'] = 'green';
  process.env['INPUT_STYLE'] = 'flat-square';
  process.env['INPUT_PATH'] = 'badges/test-badge.svg';
  process.env['INPUT_BRANCH'] = 'badge';
}

/**
 * Executes the built GitHub Action locally using the precompiled dist/index.js.
 * This simulates a run as if triggered by GitHub.
 */
function runActionLocally() {
  require('./dist/index.js');
}

// --- Execute ---

setMockInputs();
runActionLocally();
