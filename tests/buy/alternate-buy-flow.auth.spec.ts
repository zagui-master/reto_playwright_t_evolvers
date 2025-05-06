import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import fs from 'fs';
const productData = JSON.parse(
  fs.readFileSync('test-data/products-data.json', 'utf8')
);

fs.readFileSync('test-data/checkout-user-data.json', 'utf8');

test.describe('Verificar el correcto funcionamiento del sistema de comprar del sitio web Saucedemo', () => {
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Verificar que si se elimina un producto del carrito antes del checkout, el total cambia exitosamente', async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

    await test.step('Agregar 2 productos al carrito', async () => {
      await page.goto('/inventory.html');
      for (const product of productData) {
        await inventoryPage.chooseProductByProductName(product.name);
      }
    });

    await test.step('Validar el resumen de la orden: Subtotal correcto , Impuestos visibles, Total final coherente', async () => {
      await page.goto('/checkout-step-two.html');
      const productsPrice = productData.map((product) => product.price);
      const itemTotal = productsPrice.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue
      );
      const tax = 3.2;
      const total = itemTotal + tax;
      expect(
        (await checkoutStepTwoPage.getDataFromPriceTotal()).itemTotal
      ).toBe(itemTotal);
      expect((await checkoutStepTwoPage.getDataFromPriceTotal()).tax).toBe(tax);
      expect((await checkoutStepTwoPage.getDataFromPriceTotal()).total).toBe(
        total
      );
    });
    await test.step('Regresar a la pagina de productos y eliminar un producto', async () => {
      await page.goto('/inventory.html');
      await inventoryPage.removeProductByProductName(productData[0].name);
    });

    await test.step('Validar nuevamente el resumen de la orden: Subtotal correcto , Impuestos visibles, Total final coherente', async () => {
      await page.goto('/checkout-step-two.html');

      const itemTotal = productData[1].price;
      const tax = productData[1].price * productData[1].tax;
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
  });

  test('Verificar que no se puede acceder al checkout sin productos en el carrito', async ({
    page,
  }) => {
    await page.goto('/checkout-step-two.html');
    await expect(page).not.toHaveURL('/checkout-step-two.html');
  });
});
