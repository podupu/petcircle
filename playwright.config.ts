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
      testDir: "src/petstore-tests/ui-tests/tests",
    },
    {
      name: "api-tests",
      use: {
        baseURL: "https://petstore.swagger.io/v2/",
      },
      testDir: "src/petstore-tests/api-tests/pet",
    },
  ],
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }], // Default Playwright HTML report
    // ["json", { outputFolder: "playwright-report", outputFile: "report.json" }], // JSON report
  ],
};

export default config;
