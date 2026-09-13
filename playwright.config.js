const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173/universal-v010/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'android-390', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } } },
    { name: 'mobile-360', use: { ...devices['Pixel 5'], viewport: { width: 360, height: 800 } } },
    { name: 'tablet-768', use: { ...devices['iPad (gen 7)'], viewport: { width: 768, height: 1024 } } }
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: 'python3 -m http.server 4173',
    url: 'http://127.0.0.1:4173/universal-v010/',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
});
