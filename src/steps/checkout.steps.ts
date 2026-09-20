import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

When('procede al pago', async function (this: CustomWorld) {
  await this.cartPage.checkout();
});

When(
  'completa el formulario con nombre {string}, apellido {string} y código postal {string}',
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    await this.checkoutInformationPage.expectLoaded();
    await this.checkoutInformationPage.fillInformation(firstName, lastName, postalCode);
    await this.checkoutInformationPage.continue();
  },
);

When('finaliza la compra', async function (this: CustomWorld) {
  await this.checkoutOverviewPage.expectLoaded();
  await this.checkoutOverviewPage.finish();
});

Then('debería ver la confirmación de la compra', async function (this: CustomWorld) {
  await this.checkoutCompletePage.expectConfirmed();
});
