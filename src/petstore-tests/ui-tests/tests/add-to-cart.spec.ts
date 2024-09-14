import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";

const addItemsByFilter = ["lohi", "hilo", "az", "za"]; 

addItemsByFilter.forEach((filterOption) => {
  test(`Add first two items to the cart filtered by ${filterOption}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('Login to the app', async () => {
      await loginPage.navigate();
      await loginPage.login("standard_user", "secret_sauce");
    });

    await test.step(`Filter products by ${filterOption}`, async () => {
      await inventoryPage.filterBySelection(filterOption);
    });

    await test.step('Add first two items to the cart', async () => {
      await inventoryPage.addFirstTwoItemsToCart();
    });

    await test.step('Verify the cart has two items', async () => {
      const cartCount = await inventoryPage.getCartCount();
      expect(cartCount).toBe("2");
    });
  });
});
