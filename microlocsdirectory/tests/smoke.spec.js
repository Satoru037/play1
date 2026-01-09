/** @format */

const { test, expect } = require("@playwright/test");

test.describe("Smoke Tests - Critical Paths", () => {
	test("Home page loads successfully", async ({ page }) => {
		await page.goto("/", { waitUntil: "domcontentloaded" });
		await expect(page).toHaveTitle(/Microloc|Directory/i);
		await expect(page.locator("header, .site-header").first()).toBeVisible();
	});

	test("Explore page displays listings", async ({ page }) => {
		await page.goto("/explore/", { waitUntil: "domcontentloaded" });
		const listing = page.locator(".job_listing").first();
		await expect(listing).toBeVisible({ timeout: 15000 });
	});

	test("Single Listing page loads", async ({ page }) => {
		await page.goto("/listing/dianefabulous-5/", {
			waitUntil: "domcontentloaded",
		});
		await expect(page.locator("body")).toBeVisible();
		await expect(page.locator("h1").first()).toBeVisible();
	});

	test("Login/Register page is accessible", async ({ page }) => {
		await page.goto("/my-account/", { waitUntil: "domcontentloaded" });

		await expect(page).toHaveTitle(/Account|Login|Register/i);

		const mainContent = page
			.locator("main, .entry-content, form.login, form.register")
			.first();
		await expect(mainContent).toBeVisible({ timeout: 15000 });
	});
});
