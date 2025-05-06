import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage {
  readonly action: BasePage;
  readonly cart_item: Locator;
  readonly btnCheckout: Locator;
  constructor(readonly page: Page) {
    this.page = page;
    this.action = new BasePage();
    this.cart_item = page.locator('.cart_item');
    this.btnCheckout = page.getByRole('button', { name: 'Checkout' });
  }

  async getDataOfProductAddedInShoppingCart(index: string | number): Promise<{
    productName: string;
    productPrice: number;
  }> {
    const formatIndex = Number(index);
    const products = await this.cart_item.all();
    const product = products[formatIndex];

    const [nameText, priceText] = await Promise.all([
      product.locator('div[data-test="inventory-item-name"]').innerText(),
      product.locator('div[data-test="inventory-item-price"]').innerText(),
    ]);

    return {
      productName: nameText,
      productPrice: parseFloat(priceText.replace('$', '')),
    };
  }

  async goToCheckoutPage() {
    await this.action.clickOn(this.btnCheckout);
  }
}
