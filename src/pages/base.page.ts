import { Page } from '@playwright/test';

/**
 * Clase base de todas las páginas (Page Object Model).
 * Centraliza la referencia a `page` y utilidades comunes de navegación.
 */
export abstract class BasePage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  /** Navega a una ruta relativa a baseURL (definida en el contexto). */
  async navigate(path = '/'): Promise<void> {
    await this.page.goto(path);
  }
}
