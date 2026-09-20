import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  private readonly title: Locator;
  private readonly itemNames: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.title).toHaveText('Your Cart');
  }

  /** Verifica que un producto está listado en el carrito. */
  async expectItemPresent(productName: string): Promise<void> {
    await expect(this.itemNames.filter({ hasText: productName })).toBeVisible();
  }

  /** Lista de nombres de los productos en el carrito. */
  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
