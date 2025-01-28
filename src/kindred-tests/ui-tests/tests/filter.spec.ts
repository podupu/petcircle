import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";

test("Filter products by price from low to high", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");
  await inventoryPage.filterBySelection('lohi');
  const firstProduct = await page
    .locator(inventoryPage.firstProduct)
    .first()
    .textContent();
  expect(firstProduct).toBe("Sauce Labs Onesie"); 
});
