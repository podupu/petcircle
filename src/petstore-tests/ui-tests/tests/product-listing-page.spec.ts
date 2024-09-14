import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";

test.describe("Product Listing Page ", () => {
  test("- Add Item to Cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".inventory_item")).toHaveCount(6);
    await inventoryPage.addFirstTwoItemsToCart();
    const cartCount = await page.locator(".shopping_cart_badge").textContent();
    expect(cartCount).toBe("2");
  });
});
