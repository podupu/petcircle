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
  await inventoryPage.filterByPriceLowToHigh();
  await inventoryPage.addFirstTwoItemsToCart();
  await cartPage.goToCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.fillShippingDetails("Avinash", "Goud", "2150");
  await checkoutPage.completePurchase();
  const confirmationMessage = await checkoutPage.getConfirmationMessage();
  await expect(confirmationMessage).toBe("Thank you for your order!");
});
