import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage {
  readonly action: BasePage;
  readonly locatorMessagePurchaseSuccessful: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.action = new BasePage();
    this.locatorMessagePurchaseSuccessful = page.locator(
      'h2[data-test="complete-header"]'
    );
  }

  async getMessagePurchaseSuccessful(): Promise<string> {
    return await this.locatorMessagePurchaseSuccessful.innerText();
  }
}
