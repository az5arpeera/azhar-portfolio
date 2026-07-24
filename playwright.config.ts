import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3100);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  // Run against the production server, not the lazy-compiling dev server, so
  // navigation isn't racing first-hit route compilation under parallel load.
  // .env (unlike .env.local) is loaded even under the runner's NODE_ENV=test.
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 240_000,
    // NextAuth derives redirect origins from its URL; align it with the test
    // port so the /admin redirect lands on this server rather than :3000.
    env: { NEXTAUTH_URL: baseURL, AUTH_URL: baseURL },
  },
});
