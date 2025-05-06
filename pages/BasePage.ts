import { Locator } from '@playwright/test';

export class BasePage {
  async tryAction(action: () => Promise<void>) {
    try {
      await action();
    } catch (error) {
      throw new Error(
        `No se puede ejecutar la acción esperada : ${error.message}`
      );
    }
  }

  async fillOn(locator: Locator, value: any) {
    await this.tryAction(() => locator.fill(value));
  }

  async clickOn(locator: Locator) {
    await this.tryAction(() => locator.click());
  }
}
