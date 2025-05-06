import { chromium } from '@playwright/test';
import path from 'path';

const authFile = path.resolve(__dirname, './auth/.auth-user.json');

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('https://www.saucedemo.com/inventory.html');

  await context.storageState({ path: authFile });
  await browser.close();
}

export default globalSetup;
