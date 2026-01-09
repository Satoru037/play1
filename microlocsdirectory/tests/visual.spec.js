/** @format */

const { test, expect } = require("@playwright/test");
const { stabilizePage } = require("./utils/stabilizePage");
const pages = require("./pages");

test.describe("Visual Regression Tests", () => {
	test.setTimeout(120000);

	for (const pageConfig of pages) {
		const snapshotName = `${pageConfig.name}.png`;

		test(`Visual Check: ${pageConfig.name}`, async ({ page }, testInfo) => {
			await page.goto(pageConfig.path, { waitUntil: "domcontentloaded" });

			await stabilizePage(page);

			const fullPageBuffer = await page.screenshot({
				fullPage: true,
				scale: "css",
				animations: "disabled",
			});

			await testInfo.attach(`FULL PAGE – ${pageConfig.name}`, {
				body: fullPageBuffer,
				contentType: "image/png",
			});

			await expect(page).toHaveScreenshot(snapshotName, {
				fullPage: true,
				timeout: 45000,
				maxDiffPixelRatio: 0.03,
				scale: "css",
			});
		});
	}
});
