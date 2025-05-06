import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class LoginPage {
  readonly action: BasePage;
  readonly inputUserName: Locator;
  readonly inputPassword: Locator;
  readonly btnLogin: Locator;
  constructor(readonly page: Page) {
    this.page = page;
    this.action = new BasePage();
    this.inputUserName = page.getByRole('textbox', { name: 'Username' });
    this.inputPassword = page.getByRole('textbox', { name: 'Password' });
    this.btnLogin = page.getByRole('button', { name: 'Login' });
  }

  async loginOPage(user: string, password: string) {
    await this.action.fillOn(this.inputUserName, user);
    await this.action.fillOn(this.inputPassword, password);
    await this.action.clickOn(this.btnLogin);
  }
}
