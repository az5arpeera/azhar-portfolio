import { test, expect } from "@playwright/test";

test.describe("content from Supabase", () => {
  test("renders ventures, notes, resume, certs, and socials", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByTestId("venture-card")).toHaveCount(5);
    await expect(page.getByTestId("note")).toHaveCount(3);
    await expect(page.getByTestId("resume-item")).toHaveCount(2);
    await expect(page.getByTestId("certification")).toHaveCount(3);
    await expect(page.getByTestId("social-link")).toHaveCount(3);
  });

  test("a venture deep-dive page loads by slug", async ({ page }) => {
    await page.goto("/ventures/musiverse");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Musiverse",
    );
    await expect(page.getByRole("link", { name: /back to ventures/i })).toBeVisible();
  });

  test("an unknown venture slug 404s", async ({ page }) => {
    const res = await page.goto("/ventures/does-not-exist");
    expect(res?.status()).toBe(404);
  });
});

test.describe("contact form", () => {
  test("validates before submitting", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("contact-submit").click();
    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("submits a valid message", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, json: { ok: true } }),
    );
    await page.goto("/");
    await page.getByTestId("contact-name").fill("Test Person");
    await page.getByTestId("contact-email").fill("test@example.com");
    await page
      .getByTestId("contact-message")
      .fill("This is a test message with enough length.");
    await page.getByTestId("contact-submit").click();
    await expect(page.getByTestId("contact-success")).toBeVisible();
  });
});

test.describe("admin gate", () => {
  test("redirects an unauthenticated visitor away from /admin", async ({
    page,
  }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL("/");
  });

  test("the admin modal offers Google sign-in", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("admin-button").click();
    await expect(page.getByTestId("admin-modal")).toBeVisible();
    await expect(page.getByTestId("google-signin")).toBeVisible();
  });
});
