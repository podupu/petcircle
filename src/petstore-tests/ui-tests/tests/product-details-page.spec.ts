import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

test('Product Details Page - Verify Information', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.goto('https://www.saucedemo.com/inventory-item.html?id=4');
  await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');
  await page.click('.btn_primary.btn_inventory');
  const cartCount = await page.locator(".shopping_cart_badge").textContent();
  expect(cartCount).toBe("1");
});
