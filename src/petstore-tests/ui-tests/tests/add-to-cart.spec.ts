import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";

test("Add first two items to the cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");
  await inventoryPage.filterByPriceLowToHigh();
  await inventoryPage.addFirstTwoItemsToCart();
  const cartCount = await page.locator(".shopping_cart_badge").textContent();
  expect(cartCount).toBe("2");
});
