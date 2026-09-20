import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Given('que el usuario está en la página de login', async function (this: CustomWorld) {
  await this.loginPage.open();
});

// Paso reutilizable por carrito y checkout: deja al usuario logueado en productos.
Given(
  'que el usuario ha iniciado sesión como {string}',
  async function (this: CustomWorld, username: string) {
    await this.loginPage.open();
    await this.loginPage.login(username, 'secret_sauce');
    await this.inventoryPage.expectLoaded();
  },
);

When(
  'el usuario inicia sesión con el usuario {string} y la contraseña {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  },
);

Then('debería ver la página de productos', async function (this: CustomWorld) {
  await this.inventoryPage.expectLoaded();
});

Then(
  'debería ver el mensaje de error {string}',
  async function (this: CustomWorld, expectedMessage: string) {
    await this.loginPage.expectErrorMessage(expectedMessage);
  },
);
