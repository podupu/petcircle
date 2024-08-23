import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
test.describe("Login functionality", () => {
  test("Login in to swag labs successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");
    const title = await page.title();
    expect(title).toBe("Swag Labs");
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page.locator("text=Products")).toBeVisible({ timeout: 10000 });
  });

  test("Login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("/inventory.html");
  });
});
