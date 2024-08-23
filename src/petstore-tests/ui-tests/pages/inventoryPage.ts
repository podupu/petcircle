import { Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;
  private sortDropdown = ".product_sort_container";
  private firstProduct = ".inventory_item_name";
  private addToCartButtons = ".btn_inventory";

  constructor(page: Page) {
    this.page = page;
  }

  async filterByPriceLowToHigh() {
    await this.page.selectOption(this.sortDropdown, "lohi");
  }

  async addFirstTwoItemsToCart() {
    const buttons = await this.page.locator(this.addToCartButtons).all();
    await buttons[0].click();
    await buttons[1].click();
  }
}
