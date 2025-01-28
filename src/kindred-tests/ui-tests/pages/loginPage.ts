import { Page } from "@playwright/test";
import { SELECTORS } from "../../constants/selectors";

export class LoginPage {
  private page: Page;
  private usernameInput = SELECTORS.USERNAME_INPUT;
  private passwordInput = SELECTORS.PASSWORD_INPUT;
  private loginButton = SELECTORS.LOGIN_BUTTON;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/");
  }

  async getErrorMessage() {
    return this.page.locator('[data-test="error"]').textContent();
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
