/** @format */

const { test, expect } = require("@playwright/test");
const { pages } = require("./pages");
const { stabilizePage } = require("./utils/stabilizePage");

test.use({
	locale: "en-US",
});

test.describe("Visual Regression Tests - thefourthtwenty.ca", () => {
	for (const pageInfo of pages) {
		test(`Visual: ${pageInfo.name}`, async ({ page }, testInfo) => {
			// Detect device type
			const isMobile = !testInfo.project.name.includes("Desktop");
			const isFirefox = testInfo.project.name.includes("Firefox");

			console.log(`\n========================================`);
			console.log(`Running: ${testInfo.project.name}`);
			console.log(`Page: ${pageInfo.name}`);
			console.log(`Mobile: ${isMobile}`);
			console.log(`========================================\n`);

			// Navigate to page
			await page.goto(pageInfo.path, {
				waitUntil: "load",
				timeout: 60000,
			});

			// Initial wait
			await page.waitForTimeout(isMobile ? 4000 : 2000);

			// Stabilize page for screenshot
			await stabilizePage(page, isMobile);

			// Take screenshot
			const screenshotOptions = {
				fullPage: true,
				timeout: 90000,
			};

			// Use CSS scale for mobile to avoid rendering issues
			if (isMobile) {
				screenshotOptions.scale = "css";
			}

			const screenshot = await page.screenshot(screenshotOptions);

			console.log(
				`Screenshot captured for ${pageInfo.name} on ${testInfo.project.name}`,
			);

			// Attach screenshot to report
			await testInfo.attach(`Full Page – ${pageInfo.name}`, {
				body: screenshot,
				contentType: "image/png",
			});

			// Visual comparison
			expect(screenshot).toMatchSnapshot({
				name: `${pageInfo.name}-${testInfo.project.name}.png`,
				maxDiffPixelRatio: 0.02,
			});
		});
	}
});
