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
    await expect(page.locator('[data-test="title"]')).toBeVisible({ timeout: 10000 });
  });

  test("Login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("/inventory.html");
  });

  test("Login with empty password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "");
    const element = page.locator('[data-test="error"]'); 
    const text = await element.textContent();
    expect(text).toBe("Epic sadface: Password is required"); 

  });

  test("Login with empty username", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("", "standard_user");
    const element = page.locator('[data-test="error"]'); 
    const text = await element.textContent();
    expect(text).toBe("Epic sadface: Username is required"); 

  });

  test("Login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("invalid_user", "invalid_pass");
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe("Epic sadface: Username and password do not match any user in this service");
  });
});
