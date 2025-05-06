import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepOnePage {
  readonly action: BasePage;
  readonly inputName: Locator;
  readonly inputLastName: Locator;
  readonly inputPostalCode: Locator;
  readonly btnContinue: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.action = new BasePage();
    this.inputName = page.getByRole('textbox', { name: 'First Name' });
    this.inputLastName = page.getByRole('textbox', { name: 'Last Name' });
    this.inputPostalCode = page.getByRole('textbox', {
      name: 'Zip/Postal Code',
    });
    this.btnContinue = page.getByRole('button', { name: 'Continue' });
  }

  async doCheckout(name: string, lastName: string, postalCode: string) {
    await this.action.fillOn(this.inputName, name);
    await this.action.fillOn(this.inputLastName, lastName);
    await this.action.fillOn(this.inputPostalCode, postalCode);
    await this.action.clickOn(this.btnContinue);
  }
}
