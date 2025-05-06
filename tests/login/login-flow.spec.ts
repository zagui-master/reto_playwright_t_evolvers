import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import fs from 'fs';

const credentials = JSON.parse(
  fs.readFileSync('test-data/credentials.json', 'utf8')
);

test.describe('Verificar el correcto funcionamiento del sistema de login del sitio web Saucedemo', () => {
  let loginPage: LoginPage;

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  for (const credential of credentials) {
    test(`Verificar el correcto comportamiento del modulo de login con ${credential.type}`, async ({
      page,
    }) => {
      loginPage = new LoginPage(page);
      await page.goto('');
      await loginPage.loginOPage(credential.username, credential.password);

      if (credential.expectedUrl) {
        await expect(page).toHaveURL(new RegExp(`${credential.expectedUrl}$`));
      } else {
        await expect(page.locator('[data-test="error"]')).toHaveText(
          credential.expectedError
        );
      }
    });
  }

  test('Validar que no se puede acceder a rutas internas (como/inventory.html) sin estar autenticado', async ({
    page,
  }) => {
    await page.goto('/inventory.html');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await page.close();
  });
});
