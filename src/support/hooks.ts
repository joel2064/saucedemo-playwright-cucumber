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
import { mkdirSync } from 'node:fs';
import { CustomWorld } from './world';
import { config } from './config';

setDefaultTimeout(config.timeout);

const launchers = { chromium, firefox, webkit };
const TRACES_DIR = 'reports/traces';
let browser: Browser;

// Se lanza el navegador una sola vez para toda la corrida (más rápido).
BeforeAll(async function () {
  mkdirSync(TRACES_DIR, { recursive: true });   // 👈 nueva línea
  const launcher = launchers[config.browser] ?? chromium;
  browser = await launcher.launch({ headless: config.headless });
});

// Cada escenario recibe un contexto y una página limpios (aislamiento total).
Before(async function (this: CustomWorld) {
  this.browser = browser;
  this.context = await browser.newContext({ baseURL: config.baseURL });
  await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true }); // 👈
  this.page = await this.context.newPage();
});

// Al terminar: si el escenario falló, adjunta captura al reporte; luego cierra todo.
After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  const failed = scenario.result?.status === Status.FAILED;

  if (failed && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');            // captura inline (triage rápido)
  }

  if (this.context) {
    if (failed) {
      const safeName = scenario.pickle.name.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
      const tracePath = `${TRACES_DIR}/${safeName}_${Date.now()}.zip`;
      await this.context.tracing.stop({ path: tracePath });  // guarda la traza a disco
      this.attach(`Traza: ${tracePath}`, 'text/plain');      // deja el path en el reporte
    } else {
      await this.context.tracing.stop();                     // detiene sin guardar (verde)
    }
  }

  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
