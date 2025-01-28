import { Page } from "@playwright/test";

export class CheckoutPage {
  private page: Page;
  private firstNameInput = "#first-name";
  private lastNameInput = "#last-name";
  private postalCodeInput = "#postal-code";
  private continueButton = "#continue";
  private finishButton = "#finish";
  private confirmationMessage = ".complete-header";

  constructor(page: Page) {
    this.page = page;
  }

  async fillShippingDetails(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async completePurchase() {
    await this.page.click(this.finishButton);
  }

  async getConfirmationMessage() {
    return await this.page.locator(this.confirmationMessage).textContent();
  }
}
