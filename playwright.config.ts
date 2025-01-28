import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: "https://www.saucedemo.com",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "web",
      retries: 3,
      use: {
        browserName: "chromium",
      },
      testDir: "src/kindred-tests/ui-tests/tests",
    },
  ],
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }], // Default Playwright HTML report
    // ["json", { outputFolder: "playwright-report", outputFile: "report.json" }], // JSON report
  ],
};

export default config;
