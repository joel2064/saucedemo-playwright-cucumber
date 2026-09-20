import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutOverviewPage extends BasePage {
  private readonly title: Locator;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
