import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("should display site name and tagline", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("React Starseed");
    await expect(page.locator("text=A modern React starter")).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("should navigate between pages without reload", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("React Starseed");

    await page.click('a[href="/about"]');
    await expect(page.locator("h1")).toContainText("About");
    await expect(page).toHaveURL(/\/about/);

    await page.click('a[href="/"]');
    await expect(page.locator("h1")).toContainText("React Starseed");
  });
});

test.describe("Theme toggle", () => {
  test("should toggle dark/light mode", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    const initialTheme = await html.getAttribute("class");

    await page.click("button:has-text('Toggle theme')");

    const newTheme = await html.getAttribute("class");
    expect(newTheme).not.toBe(initialTheme);
  });
});
