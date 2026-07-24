import { test, expect } from "@playwright/test";

test.describe("theme toggle", () => {
  test("switches theme and survives a reload", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");

    // Wait for the persistence POST so the cookie is written before reloading.
    const saved = page.waitForResponse(
      (r) => r.url().includes("/api/prefs") && r.request().method() === "POST",
    );
    await page.getByTestId("theme-toggle").click();
    await expect(html).toHaveAttribute("data-theme", "light");
    await saved;

    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "light");
  });
});

test.describe("motion toggle", () => {
  test("halts animations when switched off", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const wave = page.getByTestId("wave-layer").first();

    await expect(html).toHaveAttribute("data-motion", "on");
    await expect(wave).toHaveCSS("animation-name", "drift");

    await page.getByTestId("motion-toggle").click();
    await expect(html).toHaveAttribute("data-motion", "off");
    await expect(wave).toHaveCSS("animation-name", "none");
  });

  test("defaults to off when the OS prefers reduced motion", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
    await context.close();
  });
});

test.describe("page structure", () => {
  test("renders every section in order", async ({ page }) => {
    await page.goto("/");
    for (const id of [
      "hero",
      "about",
      "ventures",
      "notes",
      "resume",
      "certifications",
      "interests",
      "contact",
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("venture cards link to their deep-dive routes", async ({ page }) => {
    await page.goto("/");
    const cards = page.getByTestId("venture-card");
    await expect(cards).toHaveCount(5);
    await expect(cards.first()).toHaveAttribute("href", /^\/ventures\//);
  });
});
