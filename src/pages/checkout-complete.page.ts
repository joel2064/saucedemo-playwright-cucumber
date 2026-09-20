import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutCompletePage extends BasePage {
  private readonly header: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('[data-test="complete-header"]');
  }

  /** Confirma que la compra se completó (pantalla de agradecimiento). */
  async expectConfirmed(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.header).toHaveText('Thank you for your order!');
  }
}
