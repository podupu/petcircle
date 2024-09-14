import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

test('Verify product listing page - Names, Number, and Text', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");
  const productNames = await page.locator('.inventory_item_name').allTextContents();
  const productCount = productNames.length;
  console.log('Product Count:', productCount);
  expect(productCount).toBe(6);
  const expectedNames = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Onesie",
    "Test.allTheThings() T-Shirt (Red)"
  ];
  expectedNames.forEach((name, index) => {
    expect(productNames[index]).toBe(name);
  });
  const productPrices = await page.locator('.inventory_item_price').allTextContents();
  productPrices.forEach(price => {
    expect(price).toMatch(/^\$\d+\.\d{2}$/);
  });
  console.log('Product Names:', productNames);
});
