import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

When(
  'agrega el producto {string} al carrito',
  async function (this: CustomWorld, productName: string) {
    await this.inventoryPage.addProductToCart(productName);
  },
);

Then(
  'el contador del carrito debería mostrar {string}',
  async function (this: CustomWorld, count: string) {
    await this.inventoryPage.expectCartCount(Number(count));
  },
);

When('abre el carrito', async function (this: CustomWorld) {
  await this.inventoryPage.openCart();
  await this.cartPage.expectLoaded();
});

Then(
  'debería ver el producto {string} en el carrito',
  async function (this: CustomWorld, productName: string) {
    await this.cartPage.expectItemPresent(productName);
  },
);
