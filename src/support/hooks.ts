import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout,
  ITestCaseHookParameter,
} from '@cucumber/cucumber';
import { Browser, chromium, firefox, webkit } from '@playwright/test';
import { CustomWorld } from './world';
import { config } from './config';

setDefaultTimeout(config.timeout);

const launchers = { chromium, firefox, webkit };
let browser: Browser;

// Se lanza el navegador una sola vez para toda la corrida (más rápido).
BeforeAll(async function () {
  const launcher = launchers[config.browser] ?? chromium;
  browser = await launcher.launch({ headless: config.headless });
});

// Cada escenario recibe un contexto y una página limpios (aislamiento total).
Before(async function (this: CustomWorld) {
  this.browser = browser;
  this.context = await browser.newContext({ baseURL: config.baseURL });
  this.page = await this.context.newPage();
});

// Al terminar: si el escenario falló, adjunta captura al reporte; luego cierra todo.
After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
