import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
export class CheckoutStepTwoPage {
  readonly action: BasePage;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly btnFinish: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.action = new BasePage();
    this.itemTotal = page.locator('div[data-test="subtotal-label"]');
    this.tax = page.locator('div[data-test="tax-label"]');
    this.total = page.locator('div[data-test="total-label"]');
    this.btnFinish = page.getByRole('button', { name: 'Finish' });
  }

  async getDataFromPriceTotal(): Promise<{
    itemTotal: number;
    tax: number;
    total: number;
  }> {
    const [itemTotalText, taxText, totalText] = await Promise.all([
      await this.itemTotal.innerText(),
      await this.tax.innerText(),
      await this.total.innerText(),
    ]);

    const refactorItemTotal = parseFloat(
      itemTotalText.replace('Item total: $', '')
    );
    const refactorTax = parseFloat(taxText.replace('Tax: $', ''));
    const refactorTotal = parseFloat(totalText.replace('Total: $', ''));

    return {
      itemTotal: refactorItemTotal,
      tax: refactorTax,
      total: refactorTotal,
    };
  }

  async clickOnFinishButton() {
    await this.action.clickOn(this.btnFinish);
  }
}
