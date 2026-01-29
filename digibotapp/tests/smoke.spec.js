/** @format */

const { test, expect } = require("@playwright/test");
const pages = require("./pages");

test.describe("DigiBot – Smoke Tests", () => {
	for (const p of pages) {
		test(`Smoke: ${p.name}`, async ({ page }) => {
			await page.goto(p.path, { waitUntil: "load" });
			await page.waitForLoadState("networkidle", { timeout: 15000 });

			await expect(page.locator("body")).toBeVisible();
			await expect(page.locator("header")).toBeVisible();
		});
	}
});
