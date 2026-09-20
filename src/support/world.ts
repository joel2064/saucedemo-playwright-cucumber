import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutInformationPage } from '../pages/checkout-information.page';
import { CheckoutOverviewPage } from '../pages/checkout-overview.page';
import { CheckoutCompletePage } from '../pages/checkout-complete.page';

/**
 * World personalizado de Cucumber.
 *
 * Cucumber crea una instancia NUEVA de este World por cada escenario, por lo que
 * el estado (browser context, page y page objects) queda aislado entre escenarios
 * de forma nativa. Los page objects se crean de forma perezosa (lazy) para que
 * tomen la `page` ya inicializada por el hook Before.
 */
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  private _loginPage?: LoginPage;
  private _inventoryPage?: InventoryPage;
  private _cartPage?: CartPage;
  private _checkoutInformationPage?: CheckoutInformationPage;
  private _checkoutOverviewPage?: CheckoutOverviewPage;
  private _checkoutCompletePage?: CheckoutCompletePage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  get loginPage(): LoginPage {
    return (this._loginPage ??= new LoginPage(this.page));
  }

  get inventoryPage(): InventoryPage {
    return (this._inventoryPage ??= new InventoryPage(this.page));
  }

  get cartPage(): CartPage {
    return (this._cartPage ??= new CartPage(this.page));
  }

  get checkoutInformationPage(): CheckoutInformationPage {
    return (this._checkoutInformationPage ??= new CheckoutInformationPage(this.page));
  }

  get checkoutOverviewPage(): CheckoutOverviewPage {
    return (this._checkoutOverviewPage ??= new CheckoutOverviewPage(this.page));
  }

  get checkoutCompletePage(): CheckoutCompletePage {
    return (this._checkoutCompletePage ??= new CheckoutCompletePage(this.page));
  }
}

setWorldConstructor(CustomWorld);
