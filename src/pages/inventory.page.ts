import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  private readonly title: Locator;
  private readonly inventoryList: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  /** Confirma que el login fue exitoso y la página de productos cargó. */
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }

  /** Botón "Add to cart" del producto cuyo nombre coincide exactamente. */
  private addButtonFor(productName: string): Locator {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ has: this.page.getByText(productName, { exact: true }) })
      .getByRole('button', { name: 'Add to cart' });
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.addButtonFor(productName).click();
  }

  /** Verifica el numero que muestra el badge del carrito (0 = badge oculto). */
  async expectCartCount(expected: number): Promise<void> {
    if (expected === 0) {
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toHaveText(String(expected));
    }
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
