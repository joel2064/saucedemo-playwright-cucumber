import * as dotenv from 'dotenv';

dotenv.config();

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export interface TestConfig {
  baseURL: string;
  browser: BrowserName;
  headless: boolean;
  timeout: number;
}

export const config: TestConfig = {
  baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  browser: (process.env.BROWSER as BrowserName) ?? 'chromium',
  headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : true,
  timeout: Number(process.env.TIMEOUT ?? 30_000),
};
