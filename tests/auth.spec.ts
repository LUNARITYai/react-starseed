import { test, expect } from "@playwright/test";

test.describe("Auth: Login flow", () => {
  test("should navigate to login page and show form", async ({ page }) => {
    await page.goto("/");
    await page.click('a:has-text("Sign in")');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("text=Welcome back")).toBeVisible();
  });

  test("should login with demo credentials and redirect to home", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "demo@example.com");
    await page.fill('input[type="password"]', "password");
    await page.click('button:has-text("Sign in")');

    // Should redirect to home and show user menu
    await expect(page).toHaveURL("/");
    await expect(page.locator('[data-slot="avatar"]')).toBeVisible();
    await expect(page.locator('a:has-text("Sign in")')).not.toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "demo@example.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button:has-text("Sign in")');

    await expect(page.locator("text=Invalid email or password")).toBeVisible();
  });
});

test.describe("Auth: Registration", () => {
  test("should register a new account", async ({ page }) => {
    await page.goto("/register");
    await expect(page.locator("text=Create an account")).toBeVisible();

    await page.fill('input[placeholder="Your name"]', "Test User");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[placeholder="Min. 8 characters"]', "testpass123");
    await page.fill('input[placeholder="Repeat your password"]', "testpass123");
    await page.click('button:has-text("Create account")');

    // Should redirect to home after registration
    await expect(page).toHaveURL("/");
    await expect(page.locator('[data-slot="avatar"]')).toBeVisible();
  });
});

test.describe("Auth: Protected routes", () => {
  test("should redirect to login when accessing /profile unauthenticated", async ({
    page,
  }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL(/\/login/);
  });

  test("should redirect to login when accessing /settings unauthenticated", async ({
    page,
  }) => {
    await page.goto("/settings");
    await expect(page).toHaveURL(/\/login/);
  });

  test("should access profile page when authenticated", async ({ page }) => {
    // Login first
    await page.goto("/login");
    await page.fill('input[type="email"]', "demo@example.com");
    await page.fill('input[type="password"]', "password");
    await page.click('button:has-text("Sign in")');
    await expect(page).toHaveURL("/");

    // Navigate to profile
    await page.goto("/profile");
    await expect(page.locator("h1")).toContainText("Profile");
    await expect(page.locator('[data-slot="card-description"]')).toContainText(
      "demo@example.com"
    );
  });
});

test.describe("Auth: Login page redirects authenticated users", () => {
  test("should redirect to home when already logged in", async ({ page }) => {
    // Login first
    await page.goto("/login");
    await page.fill('input[type="email"]', "demo@example.com");
    await page.fill('input[type="password"]', "password");
    await page.click('button:has-text("Sign in")');
    await expect(page).toHaveURL("/");

    // Try to access login page
    await page.goto("/login");
    await expect(page).toHaveURL("/");
  });
});
