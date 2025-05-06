import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage {
  readonly action: BasePage;
  readonly inventory_item: Locator;
  readonly shoppingCartAmount: Locator;
  readonly shoppingCartIcon: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.action = new BasePage();
    this.inventory_item = page.locator('.inventory_item');
    this.shoppingCartAmount = page.locator(
      'span[data-test="shopping-cart-badge"]'
    );
    this.shoppingCartIcon = page.locator('a[data-test="shopping-cart-link"]');
  }

  async chooseProductByProductName(productName: string) {
    const formatText = productName.toLowerCase().replace(/\s+/g, '-');
    const cssLocator = `button[data-test="add-to-cart-${formatText}"]`;
    const productButton = this.page.locator(cssLocator);
    await this.action.clickOn(productButton);
  }

  async removeProductByProductName(productName: string) {
    const formatText = productName.toLowerCase().replace(/\s+/g, '-');
    const cssLocator = `button[data-test="remove-${formatText}"]`;
    const productButton = this.page.locator(cssLocator);
    await this.action.clickOn(productButton);
  }

  async getAmountOfProductAtCartIcon(): Promise<number> {
    return parseInt(await this.shoppingCartAmount.innerText());
  }

  async goToShoppingCart() {
    await this.action.clickOn(this.shoppingCartIcon);
  }
}
