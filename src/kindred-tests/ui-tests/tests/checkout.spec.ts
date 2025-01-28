import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";

test("Complete the checkout process", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");
  await inventoryPage.filterBySelection('lohi');
  await inventoryPage.addFirstTwoItemsToCart();
  await cartPage.goToCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.fillShippingDetails("Avinash", "Goud", "2150");
  await checkoutPage.completePurchase();
  const confirmationMessage = await checkoutPage.getConfirmationMessage();
  await expect(confirmationMessage).toBe("Thank you for your order!");
});

test('Checkout Process - Verify Cart Count, Price, and Tax', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addFirstTwoItemsToCart();
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await page.click('#checkout');
  await page.fill('#first-name', 'Avinash');
  await page.fill('#last-name', 'Goud');
  await page.fill('#postal-code', '2150');
  await page.click('#continue');
  const itemCount = await page.locator('.cart_item').count();
  expect(itemCount).toBe(2);
  const itemTotalText = await page.locator('.summary_subtotal_label').textContent();
  const taxText = await page.locator('.summary_tax_label').textContent();
  const totalText = await page.locator('.summary_total_label').textContent();
  const itemTotal = parseFloat(itemTotalText!.replace('Item total: $', ''));
  const tax = parseFloat(taxText!.replace('Tax: $', ''));
  const total = parseFloat(totalText!.replace('Total: $', ''));
  console.log(`${itemTotal}     :    ${taxText}    :     ${totalText}`);
  expect(itemTotal).toBeGreaterThan(0); 
  expect(tax).toBeGreaterThan(0); 
  expect(total).toBeCloseTo(itemTotal + tax, 2); 
  await page.click('#finish');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
