// import { test as base } from "@playwright/test";
// import { LoginPage } from "./loginPage";
// import { CartPage } from "./cartPage";
// import { CheckoutPage } from "./checkoutPage";
// import { InventoryPage} from "./inventoryPage";

// export type PageObjects = {
//     loginPage: LoginPage;
//     cartPage: CartPage;
//     checkoutPage: CheckoutPage;
//     inventoryPage: InventoryPage;
// };

// export const test = base.extend<PageObjects>({
//     loginPage: async ({ page }, use) => {
//     const loginPage = new LoginPage(page);
//     await use(loginPage);
//   },
//   cartPage: async ({ page }, use) => {
//     const cartPage = new CartPage(page);
//     await use(cartPage);
//   },
//   checkoutPage: async ({ page }, use) => {
//     const checkoutPage = new CheckoutPage(page);
//     await use(checkoutPage);
//   },
//   inventoryPage: async ({ page }, use) => {
//     const inventoryPage = new InventoryPage(page);
//     await use(inventoryPage);
//   },
// });

// export { expect, Page, Locator, Response } from "@playwright/test";