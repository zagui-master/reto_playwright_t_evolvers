import { test, expect } from '@playwright/test';

import fs from 'fs';

import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';

const productData = JSON.parse(
  fs.readFileSync('test-data/products-data.json', 'utf8')
);
const checkoutUserData = JSON.parse(
  fs.readFileSync('test-data/checkout-user-data.json', 'utf8')
);

test.describe('Verificar el correcto funcionamiento del sistema de comprar del sitio web Saucedemo', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
    await page.goto('/inventory.html');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Verificar que el usuario puede realizar el flujo de compra exitosamente', async ({
    page,
  }) => {
    await test.step('Agregar 2 productos al carrito', async () => {
      for (const product of productData) {
        await inventoryPage.chooseProductByProductName(product.name);
      }
    });

    await test.step('Validar que el ícono del carrito refleje la cantidad', async () => {
      expect(await inventoryPage.getAmountOfProductAtCartIcon()).toBe(2);
    });

    await test.step('Ingresar al carrito y verificar que los productos estén presentes con sus precios correctos', async () => {
      await inventoryPage.goToShoppingCart();
      for (const [index, product] of productData.entries()) {
        const productInfo = await cartPage.getDataOfProductAddedInShoppingCart(
          index
        );
        expect(productInfo.productName).toBe(product.name);
        expect(productInfo.productPrice).toBe(product.price);
      }
    });

    await test.step('Iniciar el proceso de checkout', async () => {
      await cartPage.goToCheckoutPage();
    });

    await test.step('Completar los datos requeridos (nombre, apellido, código postal)', async () => {
      const firstName = checkoutUserData.firstName;
      const lastName = checkoutUserData.lastName;
      const postalCode = checkoutUserData.postalCode;
      await checkoutStepOnePage.doCheckout(firstName, lastName, postalCode);
    });

    await test.step('Validar el resumen de la orden: Subtotal correcto , Impuestos visibles, Total final coherente', async () => {
      const productsPrice = productData.map((product) => product.price);
      const itemTotal = productsPrice.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue
      );
      const tax = itemTotal * productData[1].tax;
      const total = itemTotal + tax;
      expect(
        (await checkoutStepTwoPage.getDataFromPriceTotal()).itemTotal
      ).toBe(itemTotal);
      expect((await checkoutStepTwoPage.getDataFromPriceTotal()).tax).toBe(
        parseFloat(tax.toFixed(2))
      );
      expect((await checkoutStepTwoPage.getDataFromPriceTotal()).total).toBe(
        parseFloat(total.toFixed(2))
      );
    });

    await test.step('Confirmar la compra y validar el mensaje de éxito', async () => {
      await checkoutStepTwoPage.clickOnFinishButton();
      expect(await checkoutCompletePage.getMessagePurchaseSuccessful()).toEqual(
        'Thank you for your order!'
      );
    });
  });
});
